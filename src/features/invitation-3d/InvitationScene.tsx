import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import type { Group, Mesh } from 'three'

interface InvitationSceneProps {
  isOpen: boolean
  onToggle: () => void
}

function PaperObject({ isOpen, onToggle }: InvitationSceneProps) {
  const group = useRef<Group>(null)
  const flap = useRef<Group>(null)
  const card = useRef<Group>(null)
  const seal = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (!group.current) return
    const ease = Math.min(1, delta * 3.25)
    group.current.rotation.y += ((isOpen ? -0.12 : 0.12 * Math.sin(state.clock.elapsedTime * 0.45)) - group.current.rotation.y) * ease
    if (flap.current) flap.current.rotation.x += ((isOpen ? -2.2 : 0) - flap.current.rotation.x) * ease
    if (card.current) {
      card.current.position.y += ((isOpen ? 1.18 : 0.16) - card.current.position.y) * ease
      card.current.position.z += ((isOpen ? 0.45 : 0.06) - card.current.position.z) * ease
      card.current.rotation.x += ((isOpen ? -0.18 : 0) - card.current.rotation.x) * ease
    }
    if (seal.current) seal.current.rotation.z += delta * 0.25
  })

  return (
    <Float floatIntensity={0.75} rotationIntensity={0.2} speed={1.15}>
      <group ref={group} onClick={onToggle} rotation={[-0.14, 0, 0.03]}>
        <mesh position={[0, 0, -0.08]}>
          <boxGeometry args={[4.8, 3.25, 0.16]} />
          <meshStandardMaterial color="#bf7658" roughness={0.72} />
        </mesh>
        <mesh position={[0, 0, 0.04]}>
          <boxGeometry args={[4.42, 2.9, 0.06]} />
          <meshStandardMaterial color="#d89a7b" roughness={0.82} />
        </mesh>
        <group ref={flap} position={[0, 1.46, 0.12]}>
          <mesh position={[0, -0.78, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[3.25, 3.25, 0.07]} />
            <meshStandardMaterial color="#c98568" roughness={0.72} />
          </mesh>
        </group>
        <group ref={card} position={[0, 0.16, 0.16]}>
          <mesh>
            <boxGeometry args={[2.8, 3.74, 0.09]} />
            <meshStandardMaterial color="#fffaf2" roughness={0.9} />
          </mesh>
          <mesh position={[0, 1.42, 0.055]}>
            <boxGeometry args={[2.18, 0.035, 0.035]} />
            <meshStandardMaterial color="#b9775b" />
          </mesh>
          <mesh position={[0, -0.68, 0.055]}>
            <boxGeometry args={[1.65, 0.028, 0.03]} />
            <meshStandardMaterial color="#3b2d26" />
          </mesh>
          <mesh position={[0, -0.98, 0.055]}>
            <boxGeometry args={[1.18, 0.02, 0.022]} />
            <meshStandardMaterial color="#b9775b" />
          </mesh>
        </group>
        <mesh ref={seal} position={[0, -0.06, 0.2]}>
          <cylinderGeometry args={[0.33, 0.33, 0.12, 32]} />
          <meshStandardMaterial color="#8f4d3c" metalness={0.1} roughness={0.55} />
        </mesh>
      </group>
    </Float>
  )
}

export default function InvitationScene({ isOpen, onToggle }: InvitationSceneProps) {
  return (
    <Canvas camera={{ fov: 31, position: [0, 0.25, 8.3] }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={2.1} />
      <directionalLight color="#ffe6c9" intensity={2.7} position={[3, 5, 5]} />
      <pointLight color="#b9775b" intensity={7} position={[-3, -1, 3]} />
      <PaperObject isOpen={isOpen} onToggle={onToggle} />
      <Sparkles count={46} color="#c98568" scale={[7, 5, 2]} size={2.6} speed={0.45} />
      <OrbitControls enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 1.8} minPolarAngle={Math.PI / 3.2} rotateSpeed={0.45} />
    </Canvas>
  )
}
