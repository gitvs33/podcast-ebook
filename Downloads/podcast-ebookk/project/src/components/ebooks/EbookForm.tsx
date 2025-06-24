import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Ebook } from '../../types';

interface EbookFormProps {
  ebook?: Ebook;
  onSubmit: (ebook: Omit<Ebook, 'id'>) => void;
  onCancel: () => void;
}

export const EbookForm: React.FC<EbookFormProps> = ({ ebook, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: ebook?.title || '',
    description: ebook?.description || '',
    author: ebook?.author || '',
    coverImage: ebook?.coverImage || '',
    price: ebook?.price?.toString() || '',
    category: ebook?.category || '',
    tags: ebook?.tags.join(', ') || '',
    pages: ebook?.pages?.toString() || '',
    fileUrl: ebook?.fileUrl || '',
    status: ebook?.status || 'draft' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      pages: parseInt(formData.pages),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      sales: ebook?.sales || 0,
      rating: ebook?.rating || 0
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      
      <Input
        label="Author"
        name="author"
        value={formData.author}
        onChange={handleChange}
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>
      
      <Input
        label="Cover Image URL"
        name="coverImage"
        value={formData.coverImage}
        onChange={handleChange}
        type="url"
        required
      />
      
      <Input
        label="File URL"
        name="fileUrl"
        value={formData.fileUrl}
        onChange={handleChange}
        type="url"
        required
      />
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price ($)"
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          step="0.01"
          min="0"
          required
        />
        
        <Input
          label="Pages"
          name="pages"
          value={formData.pages}
          onChange={handleChange}
          type="number"
          min="1"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
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
          </select>
        </div>
      </div>
      
      <Input
        label="Tags (comma-separated)"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="e.g., Marketing, Business, Strategy"
      />
      
      <div className="flex space-x-3 pt-4">
        <Button type="submit">
          {ebook ? 'Update' : 'Create'} E-book
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};