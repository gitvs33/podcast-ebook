// pages/api/ask-ai.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, FunctionDeclaration } from "@google/generative-ai";

// --- CORS CONFIGURATION ---
const ALLOWED_ORIGINS = [
  'https://your-frontend-app.vercel.app', 
  'http://localhost:3000',
  'http://localhost:8080' 
];

// --- TOOL DEFINITIONS ---
const INTERACTIVE_CANVAS_GENERATOR: FunctionDeclaration = {
  name: "InteractiveCanvasGenerator",
  description: "Generates structured data for a data-driven visualization inside a pre-existing canvas. Use this for requests like building a data structure (e.g., 'Show me a BST with these numbers'), solving an algorithm, or visualizing a concept like a neural network when the user provides the data.",
  parameters: {
    type: "OBJECT",
    properties: {
      type: {
        type: "STRING",
        description: "The specific type of visualization required, e.g., 'BST', 'neural_network', 'flowchart'."
      },
      data: {
        type: "ARRAY",
        description: "The data needed for the visualization, e.g., an array of numbers for a BST. All data should be converted to strings.",
        items: { type: "STRING" }
      },
      topic: {
        type: "STRING",
        description: "The main title or topic for the visualization."
      }
    },
    required: ["type", "data", "topic"]
  }
};

const TEXT_STRUCTURIZER: FunctionDeclaration = {
  name: "TextStructurizer",
  description: "Use this tool when the user provides a large block of text and asks to convert it into a structured format like a flowchart, mind map, or table.",
  parameters: {
    type: "OBJECT",
    properties: {
      type: {
        type: "STRING",
        description: "The type of structure to create, e.g., 'flowchart', 'mind_map', 'table'."
      },
      nodes: {
        type: "ARRAY",
        description: "An array of objects representing the main points or steps.",
        items: {
          type: "OBJECT",
          properties: {
            id: { type: "STRING" },
            label: { type: "STRING" }
          },
          required: ["id", "label"]
        }
      },
      edges: {
        type: "ARRAY",
        description: "An array of objects representing the connections between nodes.",
        items: {
          type: "OBJECT",
          properties: {
            from: { type: "STRING" },
            to: { type: "STRING" }
          },
          required: ["from", "to"]
        }
      },
      topic: {
        type: "STRING",
        description: "The main title or topic for the visualization."
      }
    },
    required: ["type", "nodes", "topic"]
  }
};

const INTERACTIVE_HTML_GENERATOR: FunctionDeclaration = {
  name: "InteractiveHTMLGenerator",
  description: "Generates a complete, self-contained, and runnable HTML file with CSS and JavaScript. Use this ONLY when the user explicitly asks for a 'runnable HTML file', 'interactive webpage', or a 'self-contained example'. This is for creating a full webpage, not for simple data visualizations.",
  parameters: {
    type: "OBJECT",
    properties: {
      topic: {
        type: "STRING",
        description: "A concise title for the HTML page, based on the user's question."
      },
      html_code: {
        type: "STRING",
        description: "The complete, self-contained, and runnable HTML code, including any necessary CSS and JavaScript within <style> and <script> tags."
      }
    },
    required: ["topic", "html_code"]
  }
};
const COURSE_MATERIAL_RETRIEVER: FunctionDeclaration = {
  name: "CourseMaterialRetriever",
  description: "Use this tool to retrieve specific information from the user's private knowledge base, such as lecture notes or textbook chapters. Use it when the user asks a question that requires factual, detailed, or context-specific knowledge about their course material.",
  parameters: {
    type: "OBJECT",
    properties: {
      search_query: {
        type: "STRING",
        description: "A concise search query to find the most relevant documents in the knowledge base."
      }
    },
    required: ["search_query"]
  }
};


// --- AI MODEL CONFIGURATION (These are now defaults) ---
const generationConfig = { temperature: 0.7, topK: 1, topP: 1, maxOutputTokens: 8192 };
const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];


// --- API HANDLER ---
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // CORS Logic
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) { res.setHeader('Access-Control-Allow-Origin', origin); }
  res.setHeader('Access-control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Model-Name');
  if (req.method === 'OPTIONS') { return res.status(200).end(); }
  if (req.method !== 'POST') { return res.status(405).json({ error: 'Method Not Allowed' }); }

  try {
    // --- DYNAMICALLY INITIALIZE AI BASED ON USER INPUT ---
    const userAuthHeader = req.headers.authorization;
    const userModelName = req.headers['x-model-name'] as string;

    let userApiKey: string | undefined;
    if (userAuthHeader && userAuthHeader.startsWith('Bearer ')) {
      userApiKey = userAuthHeader.split('Bearer ')[1];
    }

    const apiKeyToUse = userApiKey || process.env.GEMINI_API_KEY;
    const modelToUse = userModelName || 'gemini-1.5-flash';

    if (!apiKeyToUse) {
      return res.status(401).json({ error: 'API key is missing.' });
    }

    const genAI = new GoogleGenerativeAI(apiKeyToUse);
    const model = genAI.getGenerativeModel({
      model: modelToUse,
      tools: { 
        functionDeclarations: [
          INTERACTIVE_CANVAS_GENERATOR, 
          TEXT_STRUCTURIZER,
          INTERACTIVE_HTML_GENERATOR,
          COURSE_MATERIAL_RETRIEVER
        ]
      },
    });
    
    // --- PROCESS REQUEST ---
    const { userMessage, conversationContext } = req.body;
    if (!userMessage || !conversationContext) {
      return res.status(400).json({ error: 'Missing user message or context.' });
    }

    // UPDATED: The system prompt is now a clear decision tree to avoid ambiguity between tools.
    const systemPrompt = `You are Helix AI, an expert B.Tech engineering tutor. Your primary goal is to be helpful and proactive.

The user is currently studying the following topic:
- Subject: ${conversationContext.subject}
- Module: ${conversationContext.module}
- Topic: ${conversationContext.topic}

Analyze the user's message and decide on ONE of the following actions:

1.  **Generate a Data-Driven Visualization:** If the user provides specific data and asks for a visualization (e.g., "show me a BST with [1,5,3]", "visualize this data as a neural network"), you MUST use the 'InteractiveCanvasGenerator' tool. This tool is for rendering data inside a pre-existing canvas area on the page.

2.  **Generate a Full Interactive Webpage:** If the user explicitly asks for a "runnable HTML file", "interactive webpage", or a "self-contained example" to explain a concept, you MUST use the 'InteractiveHTMLGenerator' tool. This tool is for creating a complete HTML file from scratch. Do NOT use this for simple data visualizations.

3.  **Structure Unstructured Text:** If the user provides a block of text and asks to structure it (e.g., "create a flowchart from this", "make a mind map of these steps"), you MUST use the 'TextStructurizer' tool.

4.  **Retrieve Course Material:** If the user asks a question that requires specific knowledge from their course material (e.g., "explain concept X based on my notes"), you MUST first use the 'CourseMaterialRetriever' tool.

5.  **Provide a Text Answer:** For all other general questions, provide a clear, helpful text explanation using Markdown. This is your default action.

CRITICAL: You must only choose one action. Your entire response must be a single JSON object containing either a 'text_response' or a 'tool_call'. Do not output any other text.`;
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [{ role: "user", parts: [{ text: systemPrompt }] }, { role: "model", parts: [{ text: "Understood. I will analyze the user's request and choose the single best action: call a specific tool or provide a text response." }] }],
    });

    const result = await chat.sendMessage(userMessage);
    const response = result.response;
    const functionCalls = response.functionCalls();

    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      res.status(200).json({ tool_call: { name: call.name, args: call.args } });
    } else {
      const text = response.text();
      res.status(200).json({ text_response: text });
    }

  } catch (error) {
    console.error("Error in AI API route:", error);
    
    if (error.message?.includes('API key not valid') || error.message?.includes('permission denied')) {
      return res.status(401).json({ error: 'The provided API key is invalid or lacks permissions.' });
    }
    
    if (error.status === 404 || error.message?.includes('Not Found')) {
        return res.status(400).json({ error: `The model '${req.headers['x-model-name'] || 'default'}' was not found. Please check the model name.` });
    }
    
    res.status(500).json({ error: 'Failed to process AI request.' });
  }
}
