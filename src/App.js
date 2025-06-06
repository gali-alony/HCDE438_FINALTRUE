import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/0_Home';
import AddWord from './pages/1_AddWord';
import WordDetail from './pages/2_WordDetail';
import Login from './pages/Login';
import { Home as HomeIcon, PlusCircle } from 'lucide-react';
import { useAuth } from './firebase/AuthContext';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const { currentUser, logout } = useAuth();

  return (
    <Router>
      {currentUser && (
        <nav className="bg-white shadow p-4 flex items-center gap-6 border-b justify-between">
          <div className="flex gap-6">
            <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
              <HomeIcon className="w-4 h-4" />
              Home
            </Link>
            <Link to="/add" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium">
              <PlusCircle className="w-4 h-4" />
              Add Word
            </Link>
          </div>
          <button onClick={logout} className="text-sm text-red-500 hover:underline">
            Logout
          </button>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddWord /></PrivateRoute>} />
        <Route path="/word/:wordId" element={<PrivateRoute><WordDetail /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;


