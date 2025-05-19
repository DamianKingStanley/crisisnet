"use client";
import React, { useState } from 'react';

interface Alert {
  reliefwebId: string;
  title: string;
  date: string;
  type: string;
  country: string;
  status: string;
  description?: string;
  url?: string;
  score: number;
}

export default function SearchAlerts() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.statusText}`);
      }

      const data = await res.json();

      setResults(data.results || []);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search disasters..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <p className="text-red-600 mb-4">Error: {error}</p>
      )}

      {!loading && results.length === 0 && (
        <p className="text-gray-500">No results yet. Try a search above.</p>
      )}

      <ul className="space-y-4">
        {results.map((alert) => (
          <li key={alert.reliefwebId} className="border p-4 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-1">{alert.title}</h3>
            <p className="text-sm text-gray-600 mb-1">
              <strong>Date:</strong> {new Date(alert.date).toLocaleDateString()} | <strong>Type:</strong> {alert.type} | <strong>Country:</strong> {alert.country}
            </p>
            {alert.description && (
              <p className="mb-2 text-gray-700">{alert.description}</p>
            )}
            {alert.url && (
              <a
                href={alert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                More info
              </a>
            )}
            <p className="text-xs text-gray-400 mt-2">Relevance Score: {alert.score.toFixed(3)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
