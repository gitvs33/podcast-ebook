import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { EbookCard } from './EbookCard';
import { EbookForm } from './EbookForm';
import { mockEbooks } from '../../data/mockData';
import { Ebook } from '../../types';

export const EbookList: React.FC = () => {
  const [ebooks, setEbooks] = useState<Ebook[]>(mockEbooks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEbook, setEditingEbook] = useState<Ebook | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEbooks = ebooks.filter(ebook =>
    ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ebook.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ebook.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    setEditingEbook(null);
    setIsModalOpen(true);
  };

  const handleEdit = (ebook: Ebook) => {
    setEditingEbook(ebook);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setEbooks(prev => prev.filter(e => e.id !== id));
  };

  const handleSubmit = (ebookData: Omit<Ebook, 'id'>) => {
    if (editingEbook) {
      setEbooks(prev => prev.map(e => 
        e.id === editingEbook.id ? { ...ebookData, id: editingEbook.id } : e
      ));
    } else {
      const newEbook: Ebook = {
        ...ebookData,
        id: Date.now().toString()
      };
      setEbooks(prev => [newEbook, ...prev]);
    }
    setIsModalOpen(false);
    setEditingEbook(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">E-books</h2>
          <p className="text-gray-600 mt-1">Manage your digital book catalog</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus size={20} className="mr-2" />
          New E-book
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search e-books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredEbooks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No e-books found.</p>
          </div>
        ) : (
          filteredEbooks.map((ebook) => (
            <EbookCard
              key={ebook.id}
              ebook={ebook}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEbook ? 'Edit E-book' : 'Create New E-book'}
      >
        <EbookForm
          ebook={editingEbook || undefined}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};