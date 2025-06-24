import React from 'react';
import { Play, Download, Edit, Trash2, Calendar, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Podcast } from '../../types';

interface PodcastCardProps {
  podcast: Podcast;
  onEdit: (podcast: Podcast) => void;
  onDelete: (id: string) => void;
}

export const PodcastCard: React.FC<PodcastCardProps> = ({ podcast, onEdit, onDelete }) => {
  return (
    <Card hover className="p-6">
      <div className="flex items-start space-x-4">
        <img
          src={podcast.coverImage}
          alt={podcast.title}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{podcast.title}</h3>
              <p className="text-gray-600 mt-1 line-clamp-2">{podcast.description}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              podcast.status === 'published' 
                ? 'bg-green-100 text-green-800' 
                : podcast.status === 'draft'
                ? 'bg-gray-100 text-gray-800'
                : 'bg-blue-100 text-blue-800'
            }`}>
              {podcast.status}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{podcast.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{new Date(podcast.publishDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Download size={14} />
              <span>{podcast.downloads.toLocaleString()}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-3">
            {podcast.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <Button size="sm" variant="ghost">
              <Play size={16} className="mr-1" />
              Play
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onEdit(podcast)}>
              <Edit size={16} className="mr-1" />
              Edit
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onDelete(podcast.id)}>
              <Trash2 size={16} className="mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};