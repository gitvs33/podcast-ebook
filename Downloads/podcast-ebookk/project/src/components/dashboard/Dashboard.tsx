import React from 'react';
import { TrendingUp, Users, DollarSign, Download, FileText } from 'lucide-react';
import { Card } from '../ui/Card';
import { mockPodcasts, mockEbooks, mockOrders, mockBlogPosts } from '../../data/mockData';

export const Dashboard: React.FC = () => {
  const totalPodcasts = mockPodcasts.length;
  const totalEbooks = mockEbooks.length;
  const totalBlogPosts = mockBlogPosts.filter(post => post.status === 'published').length;
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const totalDownloads = mockPodcasts.reduce((sum, podcast) => sum + podcast.downloads, 0);

  const stats = [
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Podcast Downloads',
      value: totalDownloads.toLocaleString(),
      icon: Download,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Published Content',
      value: (totalPodcasts + totalEbooks).toString(),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Blog Posts',
      value: totalBlogPosts.toString(),
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening with your content.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} hover className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Podcasts</h3>
          <div className="space-y-4">
            {mockPodcasts.slice(0, 3).map((podcast) => (
              <div key={podcast.id} className="flex items-center space-x-4">
                <img
                  src={podcast.coverImage}
                  alt={podcast.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{podcast.title}</h4>
                  <p className="text-sm text-gray-500">{podcast.downloads} downloads</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  podcast.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {podcast.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Blog Posts</h3>
          <div className="space-y-4">
            {mockBlogPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="flex items-center space-x-4">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{post.title}</h4>
                  <p className="text-sm text-gray-500">{post.views} views • {post.readTime} min read</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  post.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {post.status}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};