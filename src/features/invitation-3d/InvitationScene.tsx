import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, RoundedBox, Text } from '@react-three/drei'
import { useRef } from 'react'
import type { Group, Mesh } from 'three'

interface InvitationSceneProps {
  isOpen: boolean
  onToggle: () => void
}

function InvitationPoster({ isOpen, onToggle }: InvitationSceneProps) {
  const poster = useRef<Group>(null)
  const halo = useRef<Group>(null)
  const orb = useRef<Mesh>(null)

  useFrame((state, delta) => {
    const ease = Math.min(1, delta * 3.5)

    if (poster.current) {
      const tilt = isOpen ? -0.28 : -0.06 + Math.sin(state.clock.elapsedTime * 0.42) * 0.035
      poster.current.rotation.y += (tilt - poster.current.rotation.y) * ease
      poster.current.rotation.z += ((isOpen ? 0.045 : -0.025) - poster.current.rotation.z) * ease
      poster.current.position.y += ((isOpen ? 0.28 : 0) - poster.current.position.y) * ease
      poster.current.scale.x += ((isOpen ? 1.06 : 1) - poster.current.scale.x) * ease
      poster.current.scale.y += ((isOpen ? 1.06 : 1) - poster.current.scale.y) * ease
    }

    if (halo.current) {
      halo.current.rotation.z += delta * 0.08
      halo.current.scale.x += ((isOpen ? 1.16 : 1) - halo.current.scale.x) * ease
      halo.current.scale.y += ((isOpen ? 1.16 : 1) - halo.current.scale.y) * ease
    }

    if (orb.current) orb.current.position.y = -1.92 + Math.sin(state.clock.elapsedTime * 0.8) * 0.07
  })

  return (
    <Float floatIntensity={0.8} rotationIntensity={0.25} speed={1.05}>
      <group ref={poster} onClick={onToggle} rotation={[-0.1, -0.06, -0.025]}>
        <group ref={halo} position={[0, 0, -0.12]}>
          <mesh rotation={[0, 0, 0.35]}>
            <torusGeometry args={[2.65, 0.022, 12, 64]} />
            <meshStandardMaterial color="#c98568" metalness={0.74} roughness={0.28} />
          </mesh>
          <mesh rotation={[0, 0, -0.76]}>
            <torusGeometry args={[2.08, 0.012, 12, 64]} />
            <meshStandardMaterial color="#d8b99b" metalness={0.58} roughness={0.32} />
          </mesh>
        </group>
        <RoundedBox args={[3.48, 4.92, 0.18]} radius={0.08} smoothness={4} position={[0.16, -0.12, -0.12]}>
          <meshPhysicalMaterial color="#bb765b" clearcoat={0.7} clearcoatRoughness={0.22} roughness={0.55} />
        </RoundedBox>
        <RoundedBox args={[3.48, 4.92, 0.18]} radius={0.08} smoothness={4} position={[-0.13, 0.12, -0.04]}>
          <meshPhysicalMaterial color="#d8b99b" clearcoat={0.55} clearcoatRoughness={0.3} roughness={0.64} />
        </RoundedBox>
        <RoundedBox args={[3.48, 4.92, 0.18]} radius={0.08} smoothness={4} position={[0, 0, 0.08]}>
          <meshPhysicalMaterial color="#fffaf2" clearcoat={0.82} clearcoatRoughness={0.18} roughness={0.77} />
        </RoundedBox>
        <Text anchorX="center" color="#b9775b" fontSize={0.12} letterSpacing={0.2} position={[0, 1.87, 0.19]}>SAVE THE DATE</Text>
        <Text anchorX="center" color="#3b2d26" fontSize={0.45} letterSpacing={-0.05} position={[0, 0.93, 0.19]}>NGỌC AN</Text>
        <Text anchorX="center" color="#b9775b" fontSize={0.3} position={[0, 0.38, 0.19]}>&</Text>
        <Text anchorX="center" color="#3b2d26" fontSize={0.45} letterSpacing={-0.05} position={[0, -0.13, 0.19]}>MINH KHANG</Text>
        <mesh position={[0, -0.79, 0.2]}>
          <boxGeometry args={[1.62, 0.018, 0.024]} />
          <meshStandardMaterial color="#b9775b" metalness={0.25} roughness={0.52} />
        </mesh>
        <Text anchorX="center" color="#3b2d26" fontSize={0.12} letterSpacing={0.11} position={[0, -1.14, 0.19]}>24 · 10 · 2026</Text>
        <Text anchorX="center" color="#3b2d26" fontSize={0.1} letterSpacing={0.08} position={[0, -1.43, 0.19]}>18:00 · SÀI GÒN</Text>
        <mesh ref={orb} position={[0, -1.92, 0.21]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <meshPhysicalMaterial color="#b9775b" metalness={0.25} roughness={0.25} clearcoat={1} />
        </mesh>
      </group>
    </Float>
  )
}

export default function InvitationScene({ isOpen, onToggle }: InvitationSceneProps) {
  return (
    <Canvas camera={{ fov: 30, position: [0, 0.15, 8.5] }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.95} />
      <directionalLight color="#ffe9d4" intensity={3} position={[4, 5, 5]} />
      <pointLight color="#b9775b" intensity={8} position={[-3, -2, 3]} />
      <InvitationPoster isOpen={isOpen} onToggle={onToggle} />
      <OrbitControls autoRotate autoRotateSpeed={0.28} enablePan={false} enableZoom={false} maxPolarAngle={Math.PI / 1.82} minPolarAngle={Math.PI / 3.15} rotateSpeed={0.42} />
    </Canvas>
  )
}
