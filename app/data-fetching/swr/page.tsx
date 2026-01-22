'use client';

import useSWR from 'swr';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SWRExample() {
  const { data: users, error, isLoading, mutate } = useSWR<User[]>(
    'https://jsonplaceholder.typicode.com/users',
    fetcher
  );

  const handleRefresh = () => {
    mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">SWR (useSWR) Data Fetching</h1>
            <p className="text-gray-600 mt-2">Modern data fetching with caching & revalidation</p>
          </div>
          <Link
            href="/data-fetching"
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            ← Back
          </Link>
        </div>

        {/* Code Example */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Code Example</h2>
          <pre className="bg-gray-900 text-green-400 p-4 rounded overflow-x-auto text-sm">
{`'use client';

import useSWR from 'swr';

const fetcher = (url) => fetch(url).then(r => r.json());

export default function Component() {
  const { 
    data,        // The fetched data
    error,       // Error object if fetch failed
    isLoading,   // Loading state
    mutate       // Revalidate function
  } = useSWR('/api/data', fetcher);

  if (error) return <p>Failed to load</p>;
  if (isLoading) return <p>Loading...</p>;
  
  return <div>{/* render data */}</div>;
}`}
          </pre>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl mb-2">✨</div>
            <h3 className="font-bold text-gray-800 mb-2">Pros</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Automatic caching</li>
              <li>• Built-in loading/error</li>
              <li>• Revalidation on focus</li>
              <li>• Deduplication</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl mb-2">⚠️</div>
            <h3 className="font-bold text-gray-800 mb-2">Cons</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Extra dependency</li>
              <li>• Learning curve</li>
              <li>• Configuration needed</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl mb-2">🚀</div>
            <h3 className="font-bold text-gray-800 mb-2">Best For</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Production apps</li>
              <li>• Caching needed</li>
              <li>• Complex fetching</li>
            </ul>
          </div>
        </div>

        {/* Live Demo */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Live Demo</h2>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Revalidate Data'}
            </button>
          </div>

          {isLoading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin">⚡</div>
              <p className="text-gray-600 mt-2">Loading users with SWR...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Failed to load users: {error.message}
            </div>
          )}

          {!isLoading && !error && users && (
            <>
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded">
                <p className="text-sm text-blue-800">
                  ✓ Data is cached and revalidated on window focus
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.slice(0, 6).map((user) => (
                  <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <h3 className="font-bold text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-600">{user.phone}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* SWR Features */}
        <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">SWR Features Demonstrated</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">🔄 Revalidation</h3>
              <p className="text-gray-600 text-sm">
                Click "Revalidate Data" to refresh. SWR also revalidates automatically when the window regains focus.
              </p>
            </div>
            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">💾 Caching</h3>
              <p className="text-gray-600 text-sm">
                Data is cached locally. Navigate away and back to see instant loading!
              </p>
            </div>
            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">⚡ Deduplication</h3>
              <p className="text-gray-600 text-sm">
                Multiple components requesting the same URL share one request.
              </p>
            </div>
            <div className="border-l-4 border-purple-600 pl-4">
              <h3 className="font-bold text-gray-800 mb-2">🎯 Request Dedup Window</h3>
              <p className="text-gray-600 text-sm">
                Requests within 2000ms are automatically deduplicated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
