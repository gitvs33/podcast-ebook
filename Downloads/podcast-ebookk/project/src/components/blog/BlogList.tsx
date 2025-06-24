import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { BlogCard } from './BlogCard';
import { BlogForm } from './BlogForm';
import { mockBlogPosts } from '../../data/mockData';
import { BlogPost } from '../../types';

export const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(mockBlogPosts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const handleSubmit = (postData: Omit<BlogPost, 'id'>) => {
    if (editingPost) {
      setPosts(prev => prev.map(p => 
        p.id === editingPost.id ? { ...postData, id: editingPost.id } : p
      ));
    } else {
      const newPost: BlogPost = {
        ...postData,
        id: Date.now().toString()
      };
      setPosts(prev => [newPost, ...prev]);
    }
    setIsModalOpen(false);
    setEditingPost(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Blog Posts</h2>
          <p className="text-gray-600 mt-1">Create and manage your blog content</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus size={20} className="mr-2" />
          New Blog Post
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts found.</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
      >
        <BlogForm
          post={editingPost || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};