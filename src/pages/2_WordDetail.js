import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

export default function WordDetail() {
  const { wordId } = useParams();
  const navigate = useNavigate();

  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [tag, setTag] = useState('New');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const docRef = doc(db, 'words', wordId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setWordData(data);
          setNotes(data.notes || '');
          setTag(data.tag || 'New');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching word:', err);
        setLoading(false);
      }
    };

    fetchWord();
  }, [wordId]);

  const handleSaveChanges = async () => {
    try {
      const docRef = doc(db, 'words', wordId);
      await updateDoc(docRef, { notes, tag });
      setSaveStatus('Changes saved!');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (err) {
      console.error('Error saving changes:', err);
      setSaveStatus('Error saving changes.');
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this word?");
    if (!confirmDelete) return;

    try {
      const docRef = doc(db, 'words', wordId);
      await deleteDoc(docRef);
      navigate('/'); // Go back to home after deletion
    } catch (err) {
      console.error('Error deleting word:', err);
      setSaveStatus('Error deleting word.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!wordData) return <p>Word not found.</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-blue-600 hover:underline focus:outline-none focus:ring-1 focus:ring-blue-400"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </button>

      <h2 className="text-2xl font-bold">{wordData.word}</h2>
      <p className="mt-2"><strong>Definition:</strong> {wordData.definition}</p>

      <div className="mt-4">
        <label className="block mb-1 font-medium">Notes:</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mt-4">
        <label className="font-medium">Familiarity Tag:</label>
        <select
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className="ml-2 p-2 border border-gray-300 rounded"
        >
          <option value="New">New</option>
          <option value="Familiar">Familiar</option>
          <option value="Mastered">Mastered</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        <button
          onClick={handleSaveChanges}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow transition focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <Trash2 className="h-4 w-4" />
          Delete Word
        </button>
      </div>

      {saveStatus && (
        <div className="mt-4 bg-blue-100 text-blue-800 px-4 py-2 rounded">
          {saveStatus}
        </div>
      )}
    </div>
  );
}



