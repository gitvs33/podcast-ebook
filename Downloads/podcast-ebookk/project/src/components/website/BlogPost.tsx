import React from 'react';
import { Calendar, Clock, User, ArrowLeft, Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { BlogPost as BlogPostType } from '../../types';

interface BlogPostProps {
  post: BlogPostType;
  onBack: () => void;
}

export const BlogPost: React.FC<BlogPostProps> = ({ post, onBack }) => {
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-8 text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to Blog
      </Button>

      <header className="mb-8">
        <div className="mb-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex items-center space-x-6 text-gray-600 mb-6">
          <div className="flex items-center space-x-2">
            <User size={16} />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar size={16} />
            <span>{new Date(post.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={16} />
            <span>{post.readTime} min read</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye size={16} />
            <span>{post.views.toLocaleString()} views</span>
          </div>
        </div>
        
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
        />
      </header>

      <div className="prose prose-lg max-w-none">
        <div 
          className="text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">About the Author</h3>
          <p className="text-gray-600">
            {post.author} is a content creator and industry expert passionate about sharing knowledge 
            and insights with the community.
          </p>
        </div>
      </footer>
    </article>
  );
};