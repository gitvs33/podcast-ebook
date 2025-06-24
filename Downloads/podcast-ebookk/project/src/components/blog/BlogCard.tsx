import React from 'react';
import { Edit, Trash2, Eye, Calendar, Clock, User } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { BlogPost } from '../../types';

interface BlogCardProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onEdit, onDelete }) => {
  return (
    <Card hover className="p-6">
      <div className="flex items-start space-x-4">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-32 h-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
              <p className="text-gray-600 mt-1 line-clamp-2">{post.excerpt}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              post.status === 'published' 
                ? 'bg-green-100 text-green-800' 
                : post.status === 'draft'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {post.status}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{new Date(post.publishDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{post.readTime} min read</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye size={14} />
              <span>{post.views.toLocaleString()} views</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-3">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <Button size="sm" variant="ghost" onClick={() => onEdit(post)}>
              <Edit size={16} className="mr-1" />
              Edit
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onDelete(post.id)}>
              <Trash2 size={16} className="mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};