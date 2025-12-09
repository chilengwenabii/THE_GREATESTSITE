import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { useLoader } from '@react-three/fiber';
import { Mesh } from 'three';

export default function Model3D() {
  const gltf = useLoader(GLTFLoader, '/models/model.glb');
  gltf.scene.traverse((child) => {
    if ((child as Mesh).isMesh) {
      (child as Mesh).castShadow = true;
      (child as Mesh).receiveShadow = true;
    }
  });
  return <primitive object={gltf.scene} scale={1} />;
}
