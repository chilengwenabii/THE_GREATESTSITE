'use client';
import { useEffect, useState } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Model3D from './Model3D';

export default function ModelWrapper() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const check = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent
      );
      setIsMobile(check);
    }
  }, []);

  return (
    <div className="w-full sm:w-1/2 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full h-64 sm:h-96 bg-gray-800 rounded-lg shadow-md">
        {isMobile ? (
          <div className="flex items-center justify-center w-full h-full text-white text-center p-4">
            3D preview only works on Desktop (PC). Your device does not support it.
          </div>
        ) : (
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }} shadows>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
            <Suspense fallback={null}>
              <Model3D />
            </Suspense>
            <OrbitControls enablePan enableZoom enableRotate autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        )}
      </div>N
    </div>
  );
}
