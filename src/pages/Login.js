import React, { useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, signup, loginWithGithub } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGithubLogin = async () => {
    setError('');
    try {
      await loginWithGithub();
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          {isSignup ? 'Create Your Account' : 'Welcome to'}{' '}
          {!isSignup && <span className="text-blue-600">LexiLog</span>}
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!isSignup}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <div className="text-center text-sm mt-4">
          {isSignup ? (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setIsSignup(false)}
                className="text-blue-600 hover:underline"
              >
                Log In
              </button>
            </p>
          ) : (
            <p>
              Need an account?{' '}
              <button
                onClick={() => setIsSignup(true)}
                className="text-blue-600 hover:underline"
              >
                Sign up
              </button>
            </p>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Or continue with</p>
          <button
            onClick={handleGithubLogin}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 w-full"
          >
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
}



