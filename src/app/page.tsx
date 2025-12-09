'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [title, setTitle] = useState("THE GREATEST");
  const [isGrowing, setIsGrowing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailOrUsername = (document.querySelector('input[type="text"]') as HTMLInputElement)?.value;
    const password = (document.querySelector('input[type="password"]') as HTMLInputElement)?.value;

    try {
      const response = await fetch('https://the-greatest-backend-site-1.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailOrUsername || '',
          password: password || '',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        // For demo purposes, store user info (in real app, fetch from /users/me endpoint)
        localStorage.setItem('user', JSON.stringify({ id: 1, username: emailOrUsername, full_name: 'User', email: emailOrUsername }));
        setErrorMessage(''); // Clear any previous error
        router.push('/home');
      } else {
        if (response.status === 401) {
          setErrorMessage('Invalid credentials. Please check your username and password.');
        } else {
          setErrorMessage('Login failed. Server error occurred.');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('backend not yet connected');
    }
  };

  const handleDragEnd = () => {
    setIsGrowing(true);
    setTitle("With God Rise Beyond Limits");

    // Return to original title after 7 seconds
    setTimeout(() => {
      setTitle("THE GREATEST");
      setIsGrowing(false);
    }, 7000);
  };

  return (
    <div className="w-full min-h-screen bg-green-900 flex flex-col items-center justify-center">
      {/* Top bar: Logo */}
      <header className="absolute top-0 left-0 right-0 flex items-center justify-between p-2 sm:p-4">
        <div className="flex items-center space-x-2">
          <img src="/logos/logo.png" alt="Logo" className="w-8 h-8 sm:w-12 sm:h-12" />
          <h1
            draggable
            onDragEnd={handleDragEnd}
            className={`text-white font-extrabold text-xl sm:text-3xl cursor-move select-none tracking-wide ${isGrowing ? 'gold-premium' : 'vibe'}`}
          >
            {title}
          </h1>
        </div>
      </header>

      {/* Login Card */}
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 sm:p-8 rounded-lg shadow-lg flex flex-col w-full max-w-sm sm:w-96"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-4 sm:mb-6 text-center">
          Login
        </h2>
        <input
          type="text"
          placeholder="Username or Email"
          className="mb-4 p-2 border rounded border-gray-300"
          required
        />
        <div className="relative mb-4 sm:mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="p-2 border rounded border-gray-300 pr-10 w-full"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
          </button>
        </div>
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errorMessage}
          </div>
        )}
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  );
}
