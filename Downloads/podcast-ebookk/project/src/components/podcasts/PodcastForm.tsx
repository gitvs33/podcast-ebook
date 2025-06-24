import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Podcast } from '../../types';

interface PodcastFormProps {
  podcast?: Podcast;
  onSubmit: (podcast: Omit<Podcast, 'id'>) => void;
  onCancel: () => void;
}

export const PodcastForm: React.FC<PodcastFormProps> = ({ podcast, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: podcast?.title || '',
    description: podcast?.description || '',
    audioUrl: podcast?.audioUrl || '',
    coverImage: podcast?.coverImage || '',
    duration: podcast?.duration || '',
    publishDate: podcast?.publishDate || new Date().toISOString().split('T')[0],
    category: podcast?.category || '',
    tags: podcast?.tags.join(', ') || '',
    status: podcast?.status || 'draft' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      downloads: podcast?.downloads || 0
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
        label="Audio URL"
        name="audioUrl"
        value={formData.audioUrl}
        onChange={handleChange}
        type="url"
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
      
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Duration"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="e.g., 45:32"
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
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
      </div>
      
      <Input
        label="Tags (comma-separated)"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        placeholder="e.g., Technology, AI, Innovation"
      />
      
      <div className="flex space-x-3 pt-4">
        <Button type="submit">
          {podcast ? 'Update' : 'Create'} Podcast
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};