'use client'

import { useRouter } from 'next/navigation';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useLoader } from '@react-three/fiber';

function Model3D() {
  const gltf = useLoader(GLTFLoader, '/models/model.glb');
  return <primitive object={gltf.scene} scale={1} />;
}

export default function LoginPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [title, setTitle] = useState("THE GREATEST");
  const [isGrowing, setIsGrowing] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    videoRef.current?.pause();

    const username = (document.querySelector('input[type="text"]') as HTMLInputElement)?.value;
    const password = (document.querySelector('input[type="password"]') as HTMLInputElement)?.value;

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          username: username || '',
          password: password || '',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        // For demo purposes, store user info (in real app, fetch from /users/me endpoint)
        localStorage.setItem('user', JSON.stringify({ id: 1, username: username, full_name: 'User', email: '' }));
        router.push('/home');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
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
    <div className="relative w-full h-screen bg-green-900 flex flex-col">
      {/* Top bar: Logo */}
      <header className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <img src="/logos/logo.png" alt="Logo" className="w-12 h-12" />
          <h1
            draggable
            onDragEnd={handleDragEnd}
            className={`text-white font-extrabold text-3xl cursor-move select-none tracking-wide ${isGrowing ? 'gold-premium' : 'vibe'}`}
          >
            {title}
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Left: Video background */}
        <div className="w-1/2 flex items-center justify-center p-4">
          <div className="w-full h-full border-4 border-blue-500 rounded-xl overflow-hidden shadow-2xl">
            <video
              autoPlay
              loop
              muted
              className="w-full h-full object-cover"
            >
              <source src="/videos/intro.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Right: 3D model preview */}
        <div className="w-1/2 flex items-center justify-center p-4">
          <div className="w-full h-96 bg-gray-800 rounded-lg shadow-md">
            <Canvas camera={{ position: [0, 1, 3] }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[0, 5, 5]} intensity={1} />
              <Suspense fallback={null}>
                <Stage>
                  <Model3D />
                </Stage>
              </Suspense>
              <OrbitControls enablePan={false} enableZoom={true} />
            </Canvas>
          </div>
        </div>

        {/* Centered Login Card */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96">
          <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-lg shadow-lg flex flex-col"
          >
            <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
              Login
            </h2>
            <input
              type="text"
              placeholder="Username or Email"
              className="mb-4 p-2 border rounded border-gray-300"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="mb-6 p-2 border rounded border-gray-300"
              required
            />
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
