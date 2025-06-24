import React from 'react';
import { Search, ShoppingCart, User, Headphones, BookOpen } from 'lucide-react';
import { Button } from '../ui/Button';

interface WebsiteHeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export const WebsiteHeader: React.FC<WebsiteHeaderProps> = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen size={24} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">MediaStore</span>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Home
              </a>
              <a href="#podcasts" className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center space-x-1">
                <Headphones size={16} />
                <span>Podcasts</span>
              </a>
              <a href="#ebooks" className="text-gray-700 hover:text-blue-600 font-medium transition-colors flex items-center space-x-1">
                <BookOpen size={16} />
                <span>E-books</span>
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search content..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>
            
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            <Button size="sm" variant="ghost">
              <User size={16} className="mr-1" />
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};