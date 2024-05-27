import { useRef } from 'react';
import { useGLTF } from '@react-three/drei'

export default function Model({ url }) {
  const groupRef = useRef()
  const {scene} = useGLTF(url)
  return (
    <primitive ref={groupRef} object={scene} />
  )
}