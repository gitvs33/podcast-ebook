import React from 'react';
import { Play, Download, Star, ShoppingCart, Clock, BookOpen } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  price?: number;
  rating?: number;
  type: 'podcast' | 'ebook';
  duration?: string;
  pages?: number;
  author?: string;
  downloads?: number;
  onAddToCart: (id: string, type: 'podcast' | 'ebook') => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  description,
  coverImage,
  price,
  rating,
  type,
  duration,
  pages,
  author,
  downloads,
  onAddToCart
}) => {
  return (
    <Card hover className="overflow-hidden group">
      <div className="relative">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <Button
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            {type === 'podcast' ? <Play size={16} className="mr-1" /> : <BookOpen size={16} className="mr-1" />}
            {type === 'podcast' ? 'Preview' : 'Preview'}
          </Button>
        </div>
        {type === 'podcast' && (
          <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
            {duration}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{title}</h3>
          {price && (
            <span className="text-xl font-bold text-blue-600">${price}</span>
          )}
        </div>
        
        {author && (
          <p className="text-sm text-gray-600 mb-2">by {author}</p>
        )}
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {rating && rating > 0 && (
              <div className="flex items-center space-x-1">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span>{rating}</span>
              </div>
            )}
            {type === 'ebook' && pages && (
              <div className="flex items-center space-x-1">
                <BookOpen size={14} />
                <span>{pages} pages</span>
              </div>
            )}
            {type === 'podcast' && downloads && (
              <div className="flex items-center space-x-1">
                <Download size={14} />
                <span>{downloads.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
        
        <Button
          onClick={() => onAddToCart(id, type)}
          className="w-full"
        >
          <ShoppingCart size={16} className="mr-2" />
          {price ? `Add to Cart - $${price}` : 'Free Download'}
        </Button>
      </div>
    </Card>
  );
};