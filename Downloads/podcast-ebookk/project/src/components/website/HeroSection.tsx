import React from 'react';
import { Play, BookOpen, TrendingUp } from 'lucide-react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Discover Amazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Content
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Explore our curated collection of premium podcasts and e-books. 
              Learn from industry experts and expand your knowledge with high-quality content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Play size={20} className="mr-2" />
                Browse Podcasts
              </Button>
              <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white hover:text-blue-600">
                <BookOpen size={20} className="mr-2" />
                Shop E-books
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <Play className="text-yellow-400" size={20} />
                    <span className="font-semibold">Latest Podcast</span>
                  </div>
                  <p className="text-sm text-blue-100">AI in Content Creation</p>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <BookOpen className="text-green-400" size={20} />
                    <span className="font-semibold">Bestseller</span>
                  </div>
                  <p className="text-sm text-blue-100">Digital Marketing Guide</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <TrendingUp className="text-orange-400" size={20} />
                    <span className="font-semibold">Trending</span>
                  </div>
                  <p className="text-sm text-blue-100">Remote Work Psychology</p>
                </div>
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <BookOpen className="text-purple-400" size={20} />
                    <span className="font-semibold">New Release</span>
                  </div>
                  <p className="text-sm text-blue-100">Minimalist Entrepreneur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};