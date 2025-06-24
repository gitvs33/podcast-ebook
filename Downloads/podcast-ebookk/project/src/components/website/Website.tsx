import React, { useState } from 'react';
import { WebsiteHeader } from './WebsiteHeader';
import { HeroSection } from './HeroSection';
import { ProductCard } from './ProductCard';
import { CategoryFilter } from './CategoryFilter';
import { BlogSection } from './BlogSection';
import { BlogPost } from './BlogPost';
import { Cart } from './Cart';
import { mockPodcasts, mockEbooks, mockBlogPosts } from '../../data/mockData';
import { BlogPost as BlogPostType } from '../../types';

interface CartItem {
  id: string;
  title: string;
  type: 'podcast' | 'ebook';
  price: number;
  quantity: number;
  coverImage: string;
}

export const Website: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPostType | null>(null);

  // Get all published content
  const publishedPodcasts = mockPodcasts.filter(p => p.status === 'published');
  const publishedEbooks = mockEbooks.filter(e => e.status === 'published');
  const publishedBlogPosts = mockBlogPosts.filter(p => p.status === 'published');

  // Get unique categories
  const podcastCategories = [...new Set(publishedPodcasts.map(p => p.category))];
  const ebookCategories = [...new Set(publishedEbooks.map(e => e.category))];
  const allCategories = [...new Set([...podcastCategories, ...ebookCategories])];

  // Filter content by category
  const filteredPodcasts = selectedCategory === 'all' 
    ? publishedPodcasts 
    : publishedPodcasts.filter(p => p.category === selectedCategory);
  
  const filteredEbooks = selectedCategory === 'all' 
    ? publishedEbooks 
    : publishedEbooks.filter(e => e.category === selectedCategory);

  const handleAddToCart = (id: string, type: 'podcast' | 'ebook') => {
    const content = type === 'podcast' 
      ? publishedPodcasts.find(p => p.id === id)
      : publishedEbooks.find(e => e.id === id);

    if (!content) return;

    const existingItem = cartItems.find(item => item.id === id);
    
    if (existingItem) {
      setCartItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      const newItem: CartItem = {
        id,
        title: content.title,
        type,
        price: type === 'ebook' ? (content as any).price : 0,
        quantity: 1,
        coverImage: content.coverImage
      };
      setCartItems(prev => [...prev, newItem]);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(id);
    } else {
      setCartItems(prev => prev.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!');
    setCartItems([]);
    setIsCartOpen(false);
  };

  const handleReadMore = (post: BlogPostType) => {
    setSelectedBlogPost(post);
  };

  const handleBackToBlog = () => {
    setSelectedBlogPost(null);
  };

  // If viewing a specific blog post
  if (selectedBlogPost) {
    return (
      <div className="min-h-screen bg-white">
        <WebsiteHeader 
          cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
        />
        <BlogPost post={selectedBlogPost} onBack={handleBackToBlog} />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <WebsiteHeader 
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <HeroSection />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Category</h2>
          <CategoryFilter
            categories={allCategories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {/* Podcasts Section */}
        {filteredPodcasts.length > 0 && (
          <section id="podcasts" className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Featured Podcasts</h2>
              <span className="text-gray-600">{filteredPodcasts.length} episodes</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPodcasts.map((podcast) => (
                <ProductCard
                  key={podcast.id}
                  id={podcast.id}
                  title={podcast.title}
                  description={podcast.description}
                  coverImage={podcast.coverImage}
                  type="podcast"
                  duration={podcast.duration}
                  downloads={podcast.downloads}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </section>
        )}

        {/* E-books Section */}
        {filteredEbooks.length > 0 && (
          <section id="ebooks" className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Premium E-books</h2>
              <span className="text-gray-600">{filteredEbooks.length} books</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEbooks.map((ebook) => (
                <ProductCard
                  key={ebook.id}
                  id={ebook.id}
                  title={ebook.title}
                  description={ebook.description}
                  coverImage={ebook.coverImage}
                  price={ebook.price}
                  rating={ebook.rating}
                  type="ebook"
                  pages={ebook.pages}
                  author={ebook.author}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredPodcasts.length === 0 && filteredEbooks.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No content found</h3>
            <p className="text-gray-600">Try selecting a different category or check back later for new content.</p>
          </div>
        )}
      </main>

      {/* Blog Section */}
      <BlogSection posts={publishedBlogPosts} onReadMore={handleReadMore} />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">MediaStore</h3>
              <p className="text-gray-400">Your destination for premium podcasts, e-books, and insightful content.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Content</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Podcasts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">E-books</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MediaStore. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
    </div>
  );
};