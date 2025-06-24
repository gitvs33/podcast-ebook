export interface Podcast {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  coverImage: string;
  duration: string;
  publishDate: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  downloads: number;
}

export interface Ebook {
  id: string;
  title: string;
  description: string;
  author: string;
  coverImage: string;
  price: number;
  category: string;
  tags: string[];
  status: 'draft' | 'published';
  pages: number;
  fileUrl: string;
  sales: number;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  coverImage: string;
  publishDate: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'scheduled';
  readTime: number;
  views: number;
  slug: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'refunded';
  orderDate: string;
}

export interface OrderItem {
  id: string;
  title: string;
  type: 'podcast' | 'ebook';
  price: number;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
}