import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'

interface InvitationSceneProps {
  isOpen: boolean
}

function PaperObject({ isOpen }: InvitationSceneProps) {
  const group = useRef<Group>(null)

  useFrame((state, delta) => {
    if (!group.current) return
    const targetRotation = isOpen ? -0.08 : 0.08 * Math.sin(state.clock.elapsedTime * 0.45)
    const targetY = isOpen ? 0.2 : 0
    group.current.rotation.y += (targetRotation - group.current.rotation.y) * Math.min(1, delta * 3)
    group.current.position.y += (targetY - group.current.position.y) * Math.min(1, delta * 3)
  })

  return (
    <Float floatIntensity={0.45} rotationIntensity={0.12} speed={1.25}>
      <group ref={group} rotation={[-0.08, 0, 0.04]}>
        <mesh position={[0, 0, -0.06]}>
          <boxGeometry args={[4.2, 2.7, 0.12]} />
          <meshStandardMaterial color="#c98568" roughness={0.76} />
        </mesh>
        <mesh position={[0, 0.06, 0.02]} rotation={[0, 0, 0.02]}>
          <boxGeometry args={[3.7, 2.35, 0.08]} />
          <meshStandardMaterial color="#fffaf2" roughness={0.9} />
        </mesh>
        <mesh position={[0, isOpen ? 0.4 : 0.08, 0.13]} rotation={[isOpen ? -0.18 : 0, 0, 0]}>
          <boxGeometry args={[3.35, 2.05, 0.055]} />
          <meshStandardMaterial color="#f3e4d1" roughness={0.83} />
        </mesh>
        <mesh position={[0, 0.08, 0.165]}>
          <boxGeometry args={[2.76, 0.035, 0.035]} />
          <meshStandardMaterial color="#b9775b" />
        </mesh>
        <mesh position={[0, -0.26, 0.165]}>
          <boxGeometry args={[1.58, 0.02, 0.03]} />
          <meshStandardMaterial color="#3b2d26" />
        </mesh>
      </group>
    </Float>
  )
}

export default function InvitationScene({ isOpen }: InvitationSceneProps) {
  return (
    <Canvas camera={{ fov: 32, position: [0, 0.2, 7] }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.9} />
      <directionalLight color="#ffe6c9" intensity={2.2} position={[3, 4, 5]} />
      <pointLight color="#b9775b" intensity={5} position={[-3, -1, 3]} />
      <PaperObject isOpen={isOpen} />
      <Sparkles count={28} color="#c98568" scale={[7, 4, 2]} size={2.2} speed={0.35} />
    </Canvas>
  )
}
