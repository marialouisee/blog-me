import React, {useContext, useEffect, useState, useRef , Suspense} from 'react';
import { Canvas, useLoader } from "@react-three/fiber";
import { Html, useProgress } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />

      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={1.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <spotLight intensity={1} position={[100, 0, 0]} castShadow />
    </>
  );
};

const Model = () => {
  const gltf = useLoader(GLTFLoader, );
  return (<Suspense fallback={null}>
  <primitive object={gltf.scene} />;
  </Suspense>)
}


const Home = () => {
 

  return (
   <>
   <Canvas>
    <Lights/>
   
   
   </Canvas>
   </>
  )
}

export default Home
