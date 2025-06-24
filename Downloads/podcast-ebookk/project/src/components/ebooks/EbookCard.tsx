import React from 'react';
import { Edit, Trash2, Star, DollarSign, BookOpen } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Ebook } from '../../types';

interface EbookCardProps {
  ebook: Ebook;
  onEdit: (ebook: Ebook) => void;
  onDelete: (id: string) => void;
}

export const EbookCard: React.FC<EbookCardProps> = ({ ebook, onEdit, onDelete }) => {
  return (
    <Card hover className="p-6">
      <div className="flex items-start space-x-4">
        <img
          src={ebook.coverImage}
          alt={ebook.title}
          className="w-24 h-32 rounded-lg object-cover shadow-md"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{ebook.title}</h3>
              <p className="text-gray-600 mt-1">by {ebook.author}</p>
              <p className="text-gray-600 mt-2 line-clamp-2">{ebook.description}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              ebook.status === 'published' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {ebook.status}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <DollarSign size={14} />
              <span>${ebook.price}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BookOpen size={14} />
              <span>{ebook.pages} pages</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star size={14} />
              <span>{ebook.rating > 0 ? ebook.rating : 'No rating'}</span>
            </div>
            <span>{ebook.sales} sales</span>
          </div>
          
          <div className="flex items-center space-x-2 mt-3">
            {ebook.tags.map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <Button size="sm" variant="ghost" onClick={() => onEdit(ebook)}>
              <Edit size={16} className="mr-1" />
              Edit
            </Button>
            <Button size="sm" variant="ghost" onClick={() => onDelete(ebook.id)}>
              <Trash2 size={16} className="mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};