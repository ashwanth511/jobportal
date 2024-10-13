"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { MessageSquare, User, Briefcase, ChevronRight, Search } from 'lucide-react';

export default function ConversationsPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchConversations = async () => {
        setIsLoading(true);
        setError(null);

        const { data: workerApps, error: workerError } = await supabase
          .from('job_applications')
          .select(`
            job_id,
            worker_id,
            jobs (
              title,
              client_id
            ),
            profiles!job_applications_worker_id_fkey (
              name
            )
          `)
          .eq('worker_id', user.id);

        const { data: clientApps, error: clientError } = await supabase
          .from('job_applications')
          .select(`
            job_id,
            worker_id,
            jobs (
              title,
              client_id
            ),
            profiles!job_applications_worker_id_fkey (
              name
            )
          `)
          .eq('jobs.client_id', user.id);

        if (workerError || clientError) {
          console.error('Error fetching conversations:', workerError || clientError);
          setError(workerError || clientError);
        } else {
          const allApps = [...(workerApps || []), ...(clientApps || [])];
          const uniqueApps = allApps.filter((app, index, self) =>
            index === self.findIndex((t) => t.job_id === app.job_id)
          );
          setConversations(uniqueApps);
        }
        setIsLoading(false);
      };

      fetchConversations();
    }
  }, [user]);

  const filteredConversations = conversations.filter(conv =>
    conv.jobs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.profiles.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center mt-8">Loading conversations...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">Error loading conversations: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Conversations</h1>
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredConversations.map((conv) => (
              <li key={conv.job_id}>
                <Link href={`/messages/${conv.job_id}`}>
                  <div className="block hover:bg-gray-50 transition duration-150 ease-in-out">
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                          {conv.jobs.client_id === user.id ? (
                            <User className="h-12 w-12 text-gray-400" />
                          ) : (
                            <Briefcase className="h-12 w-12 text-gray-400" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <p className="text-sm font-medium text-blue-600 truncate">{conv.jobs.title}</p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <MessageSquare className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              <span className="truncate">{conv.profiles.name}</span>
                            </p>
                          </div>
                          <div className="hidden md:block">
                            <div>
                              <p className="text-sm text-gray-900">
                                {conv.jobs.client_id === user.id ? 'Worker' : 'Client'}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                Job ID: {conv.job_id}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {filteredConversations.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No conversations found.</p>
        )}
      </div>
    </div>
  );
}
