import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext'; // ✅ Add this

export default function Home() {
  const [words, setWords] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [filterTag, setFilterTag] = useState('All');
  const navigate = useNavigate();
  const { currentUser } = useAuth(); // ✅ Get current user

  const familiarityOrder = {
    New: 1,
    Familiar: 2,
    Mastered: 3,
  };

  useEffect(() => {
    const fetchWords = async () => {
      if (!currentUser) return;

      const q = query(
        collection(db, 'words'),
        where('uid', '==', currentUser.uid) // ✅ Match user ID
      );
      const wordSnapshot = await getDocs(q);
      const wordList = wordSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWords(wordList);
    };

    fetchWords();
  }, [currentUser]);

  useEffect(() => {
    let visibleWords = [...words];

    if (filterTag !== 'All') {
      visibleWords = visibleWords.filter(word => word.tag === filterTag);
    }

    visibleWords.sort((a, b) => {
      const rankA = familiarityOrder[a.tag] || 4;
      const rankB = familiarityOrder[b.tag] || 4;
      return rankA - rankB;
    });

    setFilteredWords(visibleWords);
  }, [filterTag, words]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Your Saved Words</h1>
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="border rounded px-3 py-1 text-sm"
        >
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="Familiar">Familiar</option>
          <option value="Mastered">Mastered</option>
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {filteredWords.map(word => {
          let borderColor, tagBg, tagText;

          switch (word.tag) {
            case 'New':
              borderColor = 'border-blue-300';
              tagBg = 'bg-blue-100';
              tagText = 'text-blue-700';
              break;
            case 'Familiar':
              borderColor = 'border-yellow-400';
              tagBg = 'bg-yellow-100';
              tagText = 'text-yellow-800';
              break;
            case 'Mastered':
              borderColor = 'border-green-400';
              tagBg = 'bg-green-100';
              tagText = 'text-green-800';
              break;
            default:
              borderColor = 'border-gray-300';
              tagBg = 'bg-gray-100';
              tagText = 'text-gray-700';
          }

          return (
            <div
              key={word.id}
              onClick={() => navigate(`/word/${word.id}`)}
              className={`cursor-pointer bg-white shadow-md rounded-lg p-4 hover:scale-105 transition-transform border-l-4 ${borderColor}`}
            >
              <h2 className="text-lg font-semibold text-gray-800">{word.word}</h2>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{word.definition}</p>
              <span className={`inline-block mt-2 text-xs px-2 py-1 rounded ${tagBg} ${tagText}`}>
                {word.tag || 'New'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}







