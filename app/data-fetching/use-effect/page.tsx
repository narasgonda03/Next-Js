'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function UseEffectExample() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulating API call with delay
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this runs once on mount

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">useEffect Data Fetching</h1>
            <p className="text-gray-600 mt-2">Traditional React hook approach</p>
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

import { useState, useEffect } from 'react';

export default function Component() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/data');
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Runs once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <div>{/* render data */}</div>;
}`}
          </pre>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl mb-2">✓</div>
            <h3 className="font-bold text-gray-800 mb-2">Pros</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Built-in React hook</li>
              <li>• No dependencies needed</li>
              <li>• Full control</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl mb-2">✗</div>
            <h3 className="font-bold text-gray-800 mb-2">Cons</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Manual state management</li>
              <li>• No caching</li>
              <li>• Verbose code</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-2xl mb-2">📝</div>
            <h3 className="font-bold text-gray-800 mb-2">Best For</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Simple data fetching</li>
              <li>• Learning purposes</li>
              <li>• Small projects</li>
            </ul>
          </div>
        </div>

        {/* Live Demo */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Live Demo</h2>
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'Refresh Data'}
            </button>
          </div>

          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin">⏳</div>
              <p className="text-gray-600 mt-2">Loading users...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              Error: {error}
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {users.slice(0, 6).map((user) => (
                <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                  <h3 className="font-bold text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-600">{user.phone}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
