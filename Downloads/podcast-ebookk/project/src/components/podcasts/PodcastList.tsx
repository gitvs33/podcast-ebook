import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { PodcastCard } from './PodcastCard';
import { PodcastForm } from './PodcastForm';
import { mockPodcasts } from '../../data/mockData';
import { Podcast } from '../../types';

export const PodcastList: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>(mockPodcasts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPodcast, setEditingPodcast] = useState<Podcast | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPodcasts = podcasts.filter(podcast =>
    podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    podcast.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setEditingPodcast(null);
    setIsModalOpen(true);
  };

  const handleEdit = (podcast: Podcast) => {
    setEditingPodcast(podcast);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setPodcasts(prev => prev.filter(p => p.id !== id));
  };

  const handleSubmit = (podcastData: Omit<Podcast, 'id'>) => {
    if (editingPodcast) {
      setPodcasts(prev => prev.map(p => 
        p.id === editingPodcast.id ? { ...podcastData, id: editingPodcast.id } : p
      ));
    } else {
      const newPodcast: Podcast = {
        ...podcastData,
        id: Date.now().toString()
      };
      setPodcasts(prev => [newPodcast, ...prev]);
    }
    setIsModalOpen(false);
    setEditingPodcast(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Podcasts</h2>
          <p className="text-gray-600 mt-1">Manage your podcast episodes</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus size={20} className="mr-2" />
          New Podcast
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search podcasts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredPodcasts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No podcasts found.</p>
          </div>
        ) : (
          filteredPodcasts.map((podcast) => (
            <PodcastCard
              key={podcast.id}
              podcast={podcast}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPodcast ? 'Edit Podcast' : 'Create New Podcast'}
      >
        <PodcastForm
          podcast={editingPodcast || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};