import React, { useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useAuth } from '../firebase/AuthContext'; // ✅ New
import { PlusCircle } from 'lucide-react';

export default function AddWord() {
  const { currentUser } = useAuth(); // ✅ Get current user
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [error, setError] = useState('');
  const [notes, setNotes] = useState('');
  const [tag, setTag] = useState('New');
  const [saved, setSaved] = useState(false);

  const fetchDefinition = async () => {
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await res.json();

      if (res.ok) {
        setDefinition(data[0].meanings[0].definitions[0].definition);
        setError('');
        setSaved(false);
      } else {
        setDefinition('');
        setError(data.title || 'Word not found.');
      }
    } catch (err) {
      setError('Failed to fetch definition.');
      setDefinition('');
    }
  };

  const handleSave = async () => {
    if (!word || !definition || !currentUser) return;

    try {
      await addDoc(collection(db, 'words'), {
        word,
        definition,
        notes,
        tag,
        uid: currentUser.uid, // ✅ Associate word with the logged-in user
        createdAt: Timestamp.now(),
      });

      setSaved(true);
      setWord('');
      setDefinition('');
      setNotes('');
      setTag('New');
    } catch (err) {
      console.error('Error saving word:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.trim()) fetchDefinition();
  };

  return (
    <div className="p-4">
      <h2 className="flex items-center text-xl font-semibold mb-4">
        <PlusCircle className="w-6 h-6 text-blue-600 mr-2" />
        Add a New Word
      </h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Enter a word..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="border px-3 py-2 mr-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Search
        </button>
      </form>

      {definition && (
        <div className="bg-green-50 p-4 rounded shadow mb-4">
          <p><strong>Definition:</strong> {definition}</p>

          <div className="mt-4">
            <label className="block mb-2">Notes:</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="mt-4">
            <label className="block mb-1">Familiarity:</label>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="New">New</option>
              <option value="Familiar">Familiar</option>
              <option value="Mastered">Mastered</option>
            </select>
          </div>

          <button
            onClick={handleSave}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save to LexiLog
          </button>
        </div>
      )}

      {saved && (
        <div className="bg-blue-100 text-blue-800 p-3 rounded shadow">
          Word saved successfully!
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded shadow">
          {error}
        </div>
      )}
    </div>
  );
}
