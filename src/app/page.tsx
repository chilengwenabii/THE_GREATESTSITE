'use client'

import { useRouter } from 'next/navigation';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useLoader } from '@react-three/fiber';
import { Mesh } from 'three';
import { Eye, EyeOff } from 'lucide-react';

function Model3D() {
  const gltf = useLoader(GLTFLoader, '/models/model.glb');
  gltf.scene.traverse((child) => {
    if ((child as Mesh).isMesh) {
      (child as Mesh).castShadow = true;
      (child as Mesh).receiveShadow = true;
    }
  });
  return <primitive object={gltf.scene} scale={1} />;
}

export default function LoginPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [title, setTitle] = useState("THE GREATEST");
  const [isGrowing, setIsGrowing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    videoRef.current?.pause();

    const username = (document.querySelector('input[type="text"]') as HTMLInputElement)?.value;
    const password = (document.querySelector('input[type="password"]') as HTMLInputElement)?.value;

    try {
      const response = await fetch('https://the-greatest-backend-site-1.onrender.com/auth/login', {
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
    <div className="relative w-full min-h-screen bg-green-900 flex flex-col">
      {/* Top bar: Logo */}
      <header className="flex items-center justify-between p-2 sm:p-4">
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

      {/* Main Content */}
      <div className="flex flex-col sm:flex-row flex-1">
        {/* Login Card - Top on small screens */}
        <div className="flex justify-center p-4 sm:hidden">
          <form
            onSubmit={handleLogin}
            className="bg-white p-6 rounded-lg shadow-lg flex flex-col w-full max-w-sm"
          >
            <h2 className="text-xl font-bold text-green-700 mb-4 text-center">
              Login
            </h2>
            <input
              type="text"
              placeholder="Username or Email"
              className="mb-4 p-2 border rounded border-gray-300"
              required
            />
            <div className="relative mb-4">
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
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
            >
              Login
            </button>
          </form>
        </div>

        {/* 3D model preview - Middle on small screens */}
        <div className="w-full sm:w-1/2 flex items-center justify-center p-2 sm:p-4 order-2 sm:order-2">
          <div className="w-full h-64 sm:h-96 bg-gray-800 rounded-lg shadow-md">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows style={{ touchAction: 'none' }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
              <directionalLight position={[-5, 5, 5]} intensity={0.8} />
              <pointLight position={[0, 10, 0]} intensity={0.5} />
              <Suspense fallback={null}>
                <Stage shadowsEnabled>
                  <Model3D />
                </Stage>
              </Suspense>
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} enableDamping={false} autoRotate={true} autoRotateSpeed={0.5} />
            </Canvas>
          </div>
        </div>

        {/* Video background - Bottom on small screens */}
        <div className="w-full sm:w-1/2 flex items-center justify-center p-2 sm:p-4 order-3 sm:order-1">
          <div className="w-full h-64 sm:h-full border-2 sm:border-4 border-blue-500 rounded-xl overflow-hidden shadow-2xl">
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
      </div>

      {/* Centered Login Card - Only on large screens */}
      <div className="hidden sm:flex justify-center items-center absolute inset-0 pointer-events-none">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-lg flex flex-col w-96 pointer-events-auto"
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
          <div className="relative mb-6">
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
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
