import React, { useState } from 'react';

export const DashboardClient = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const json = await response.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <button 
        onClick={loadData}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Load Data'}
      </button>

      {error && (
        <div className="text-red-400 mt-4">
          Error: {error}
        </div>
      )}

      {data.length > 0 && (
        <ul className="mt-6 space-y-4 w-full">
          {data.map((post) => (
            <li key={post.id} className="bg-slate-700 p-4 rounded-lg">
              <h3 className="font-bold text-lg text-blue-300">{post.title}</h3>
              <p className="text-slate-300 mt-2">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
