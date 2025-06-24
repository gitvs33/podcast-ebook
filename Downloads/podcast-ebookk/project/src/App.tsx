import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { PodcastList } from './components/podcasts/PodcastList';
import { EbookList } from './components/ebooks/EbookList';
import { BlogList } from './components/blog/BlogList';
import { OrderList } from './components/orders/OrderList';
import { Website } from './components/website/Website';
import { useAuth } from './hooks/useAuth';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Access your content management system
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <p className="text-center text-gray-600">
              Authentication simulation - you're automatically logged in as Admin User
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If viewing website, render it without the CMS layout
  if (activeTab === 'website') {
    return <Website />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'podcasts':
        return <PodcastList />;
      case 'ebooks':
        return <EbookList />;
      case 'blog':
        return <BlogList />;
      case 'orders':
        return <OrderList />;
      case 'analytics':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics</h2>
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;