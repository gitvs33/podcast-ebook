import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { BlogPost } from '../../types';

interface BlogFormProps {
  post?: BlogPost;
  onSubmit: (post: Omit<BlogPost, 'id'>) => void;
  onCancel: () => void;
}

export const BlogForm: React.FC<BlogFormProps> = ({ post, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    author: post?.author || '',
    coverImage: post?.coverImage || '',
    publishDate: post?.publishDate || new Date().toISOString().split('T')[0],
    category: post?.category || '',
    tags: post?.tags.join(', ') || '',
    readTime: post?.readTime?.toString() || '',
    slug: post?.slug || '',
    status: post?.status || 'draft' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      readTime: parseInt(formData.readTime) || 5,
      views: post?.views || 0
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleTitleChange}
          required
        />
        
        <Input
          label="Slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          placeholder="url-friendly-version-of-title"
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Excerpt
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description of the post..."
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
            placeholder="Write your blog post content here... (HTML supported)"
            required
          />
          <p className="text-xs text-gray-500 mt-1">You can use HTML tags for formatting</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Cover Image URL"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            type="url"
            required
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
          
          <Input
            label="Read Time (minutes)"
            name="readTime"
            value={formData.readTime}
            onChange={handleChange}
            type="number"
            min="1"
            required
          />
          
          <Input
            label="Publish Date"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
            type="date"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Tags (comma-separated)"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., Technology, AI, Innovation"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>
        
        <div className="flex space-x-3 pt-4">
          <Button type="submit">
            {post ? 'Update' : 'Create'} Blog Post
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};