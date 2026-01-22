import Link from 'next/link';

export default function DataFetchingHome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Client-Side Data Fetching</h1>
        <p className="text-gray-600 mb-8">Learn different approaches to fetch data on the client side</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* useEffect Card */}
          <Link href="/data-fetching/use-effect">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="text-3xl mb-4">🪝</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">useEffect</h2>
              <p className="text-gray-600 mb-4">
                Traditional approach using React hooks to fetch data when components mount or dependencies change.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Built-in React hook</li>
                <li>✓ Full control over fetching logic</li>
                <li>✓ Good for simple data fetching</li>
                <li>✗ Manual loading/error states</li>
              </ul>
            </div>
          </Link>

          {/* SWR Card */}
          <Link href="/data-fetching/swr">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="text-3xl mb-4">⚡</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">SWR (useSWR)</h2>
              <p className="text-gray-600 mb-4">
                Modern data fetching hook with built-in caching, revalidation, and advanced features.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✓ Automatic caching</li>
                <li>✓ Built-in loading/error states</li>
                <li>✓ Revalidation on focus</li>
                <li>✓ Deduplication</li>
              </ul>
            </div>
          </Link>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 border-b-2 border-gray-300">
                <tr>
                  <th className="p-3">Feature</th>
                  <th className="p-3">useEffect</th>
                  <th className="p-3">SWR</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-semibold">Caching</td>
                  <td className="p-3">❌</td>
                  <td className="p-3">✅ Automatic</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-semibold">Loading State</td>
                  <td className="p-3">Manual</td>
                  <td className="p-3">✅ Built-in</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-semibold">Error Handling</td>
                  <td className="p-3">Manual</td>
                  <td className="p-3">✅ Built-in</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-semibold">Revalidation</td>
                  <td className="p-3">Manual</td>
                  <td className="p-3">✅ Automatic</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-semibold">Learning Curve</td>
                  <td className="p-3">Easy</td>
                  <td className="p-3">Easy</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
