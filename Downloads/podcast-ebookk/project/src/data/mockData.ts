import { Podcast, Ebook, Order, BlogPost } from '../types';

export const mockPodcasts: Podcast[] = [
  {
    id: '1',
    title: 'The Future of AI in Content Creation',
    description: 'Exploring how artificial intelligence is revolutionizing the way we create digital content, from writing to visual arts.',
    audioUrl: '/audio/ai-content-creation.mp3',
    coverImage: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '45:32',
    publishDate: '2024-01-15',
    category: 'Technology',
    tags: ['AI', 'Content', 'Innovation'],
    status: 'published',
    downloads: 12450
  },
  {
    id: '2',
    title: 'Building Sustainable Businesses',
    description: 'A deep dive into creating businesses that prioritize environmental and social responsibility.',
    audioUrl: '/audio/sustainable-business.mp3',
    coverImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '38:15',
    publishDate: '2024-01-10',
    category: 'Business',
    tags: ['Sustainability', 'Environment', 'Ethics'],
    status: 'published',
    downloads: 8920
  },
  {
    id: '3',
    title: 'The Psychology of Remote Work',
    description: 'Understanding the mental health challenges and benefits of working from home.',
    audioUrl: '/audio/remote-work-psychology.mp3',
    coverImage: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400',
    duration: '52:08',
    publishDate: '2024-01-05',
    category: 'Psychology',
    tags: ['Remote Work', 'Mental Health', 'Productivity'],
    status: 'draft',
    downloads: 0
  }
];

export const mockEbooks: Ebook[] = [
  {
    id: '1',
    title: 'Digital Marketing Mastery',
    description: 'A comprehensive guide to modern digital marketing strategies and techniques.',
    author: 'Sarah Johnson',
    coverImage: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 29.99,
    category: 'Marketing',
    tags: ['Digital Marketing', 'SEO', 'Social Media'],
    status: 'published',
    pages: 245,
    fileUrl: '/books/digital-marketing-mastery.pdf',
    sales: 156,
    rating: 4.7
  },
  {
    id: '2',
    title: 'The Minimalist Entrepreneur',
    description: 'Learn how to build a successful business with minimal resources and maximum impact.',
    author: 'Alex Chen',
    coverImage: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 24.99,
    category: 'Business',
    tags: ['Entrepreneurship', 'Minimalism', 'Startup'],
    status: 'published',
    pages: 198,
    fileUrl: '/books/minimalist-entrepreneur.pdf',
    sales: 89,
    rating: 4.5
  },
  {
    id: '3',
    title: 'Creative Writing for Beginners',
    description: 'A step-by-step guide to developing your creative writing skills.',
    author: 'Emma Williams',
    coverImage: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 19.99,
    category: 'Writing',
    tags: ['Creative Writing', 'Fiction', 'Storytelling'],
    status: 'draft',
    pages: 180,
    fileUrl: '/books/creative-writing-beginners.pdf',
    sales: 0,
    rating: 0
  }
];

export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Rise of Audio Content: Why Podcasts Are Taking Over',
    content: `
      <p>In recent years, we've witnessed an unprecedented surge in audio content consumption. Podcasts, once a niche medium, have now become mainstream entertainment and education platforms that millions of people turn to daily.</p>
      
      <h2>The Numbers Don't Lie</h2>
      <p>According to recent studies, over 100 million Americans listen to podcasts monthly, and this number continues to grow exponentially. The convenience of consuming content while multitasking has made podcasts an integral part of modern life.</p>
      
      <h2>Why Audio Content Works</h2>
      <p>Audio content offers a unique intimacy that other mediums struggle to match. When you listen to a podcast, it feels like having a personal conversation with the host. This creates a deeper connection between content creators and their audience.</p>
      
      <h2>The Future of Audio</h2>
      <p>As technology continues to evolve, we can expect even more innovative audio experiences. From interactive podcasts to AI-generated content, the future of audio is bright and full of possibilities.</p>
    `,
    excerpt: 'Exploring the explosive growth of podcast consumption and why audio content has become the preferred medium for millions of listeners worldwide.',
    author: 'Michael Rodriguez',
    coverImage: 'https://images.pexels.com/photos/6686445/pexels-photo-6686445.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishDate: '2024-01-20',
    category: 'Industry Insights',
    tags: ['Podcasts', 'Audio Content', 'Media Trends'],
    status: 'published',
    readTime: 5,
    views: 2340,
    slug: 'rise-of-audio-content-podcasts-taking-over'
  },
  {
    id: '2',
    title: 'Digital Publishing Revolution: How E-books Are Changing Reading',
    content: `
      <p>The digital publishing landscape has transformed dramatically over the past decade. E-books have not only survived the initial skepticism but have thrived, creating new opportunities for both authors and readers.</p>
      
      <h2>Accessibility and Convenience</h2>
      <p>E-books have made reading more accessible than ever before. With features like adjustable font sizes, built-in dictionaries, and text-to-speech capabilities, digital books cater to diverse reading needs and preferences.</p>
      
      <h2>The Self-Publishing Boom</h2>
      <p>Digital platforms have democratized publishing, allowing authors to reach audiences directly without traditional gatekeepers. This has led to an explosion of diverse voices and niche content that might never have found a traditional publisher.</p>
      
      <h2>Environmental Impact</h2>
      <p>Beyond convenience, e-books offer significant environmental benefits. The reduction in paper usage, printing, and shipping makes digital books a more sustainable choice for environmentally conscious readers.</p>
    `,
    excerpt: 'Examining how digital books have revolutionized the publishing industry and changed the way we consume written content.',
    author: 'Sarah Chen',
    coverImage: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishDate: '2024-01-18',
    category: 'Digital Publishing',
    tags: ['E-books', 'Publishing', 'Digital Media'],
    status: 'published',
    readTime: 4,
    views: 1890,
    slug: 'digital-publishing-revolution-ebooks-changing-reading'
  },
  {
    id: '3',
    title: 'Content Creator Economy: Monetizing Your Passion',
    content: `
      <p>The creator economy has exploded into a multi-billion dollar industry, offering unprecedented opportunities for individuals to monetize their skills, knowledge, and creativity.</p>
      
      <h2>Multiple Revenue Streams</h2>
      <p>Successful content creators don't rely on a single income source. From sponsorships and affiliate marketing to direct sales and subscription models, diversification is key to sustainable creator income.</p>
      
      <h2>Building Your Audience</h2>
      <p>The foundation of any successful creator business is a loyal, engaged audience. This requires consistent, high-quality content that provides genuine value to your community.</p>
      
      <h2>Tools and Platforms</h2>
      <p>Today's creators have access to sophisticated tools and platforms that make content creation and distribution easier than ever. From podcast hosting to e-book publishing platforms, the barriers to entry continue to lower.</p>
    `,
    excerpt: 'A comprehensive guide to building a sustainable business as a content creator in today\'s digital economy.',
    author: 'Alex Thompson',
    coverImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishDate: '2024-01-16',
    category: 'Creator Economy',
    tags: ['Content Creation', 'Monetization', 'Business'],
    status: 'published',
    readTime: 6,
    views: 3120,
    slug: 'content-creator-economy-monetizing-passion'
  },
  {
    id: '4',
    title: 'The Psychology of Learning Through Audio',
    content: `
      <p>Audio learning has gained significant traction in recent years, but what makes it so effective? Understanding the psychology behind auditory learning can help both creators and consumers maximize the benefits of audio content.</p>
      
      <h2>Cognitive Processing</h2>
      <p>When we listen to audio content, our brains process information differently than when reading text. This auditory processing can enhance retention and comprehension for many learners.</p>
      
      <h2>Multitasking Benefits</h2>
      <p>Audio content allows for productive multitasking, enabling learners to absorb information while commuting, exercising, or performing routine tasks. This efficiency makes learning more accessible and convenient.</p>
      
      <h2>Emotional Connection</h2>
      <p>The human voice carries emotional nuances that text cannot convey. This emotional connection can make learning more engaging and memorable, leading to better knowledge retention.</p>
    `,
    excerpt: 'Exploring the cognitive science behind audio learning and why it\'s become such an effective educational medium.',
    author: 'Dr. Emily Watson',
    coverImage: 'https://images.pexels.com/photos/3771115/pexels-photo-3771115.jpeg?auto=compress&cs=tinysrgb&w=800',
    publishDate: '2024-01-12',
    category: 'Education',
    tags: ['Psychology', 'Learning', 'Audio Education'],
    status: 'draft',
    readTime: 7,
    views: 0,
    slug: 'psychology-learning-through-audio'
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    items: [
      {
        id: '1',
        title: 'Digital Marketing Mastery',
        type: 'ebook',
        price: 29.99,
        quantity: 1
      }
    ],
    total: 29.99,
    status: 'completed',
    orderDate: '2024-01-15'
  },
  {
    id: '2',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    items: [
      {
        id: '2',
        title: 'The Minimalist Entrepreneur',
        type: 'ebook',
        price: 24.99,
        quantity: 1
      }
    ],
    total: 24.99,
    status: 'pending',
    orderDate: '2024-01-14'
  }
];