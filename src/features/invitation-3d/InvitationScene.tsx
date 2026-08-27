import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import { useRef } from 'react'
import { Shape, type Group } from 'three'

interface InvitationSceneProps {
  isOpen: boolean
  onToggle: () => void
}

const topFlapShape = new Shape()
topFlapShape.moveTo(-2.58, 0)
topFlapShape.lineTo(2.58, 0)
topFlapShape.lineTo(0, -1.7)
topFlapShape.lineTo(-2.58, 0)

const lowerFoldShape = new Shape()
lowerFoldShape.moveTo(-2.58, -1.68)
lowerFoldShape.lineTo(2.58, -1.68)
lowerFoldShape.lineTo(0, 0.02)
lowerFoldShape.lineTo(-2.58, -1.68)

function Envelope({ isOpen, onToggle }: InvitationSceneProps) {
  const flap = useRef<Group>(null)
  const card = useRef<Group>(null)
  const cardShadow = useRef<Group>(null)

  useFrame((_, delta) => {
    const ease = Math.min(1, delta * 4.5)
    const cardY = isOpen ? 2.05 : 0.12
    const cardZ = isOpen ? 0.62 : 0.02

    if (flap.current) flap.current.rotation.x += ((isOpen ? -2.36 : 0) - flap.current.rotation.x) * ease
    if (card.current) {
      card.current.position.y += (cardY - card.current.position.y) * ease
      card.current.position.z += (cardZ - card.current.position.z) * ease
      card.current.rotation.x += ((isOpen ? -0.08 : 0) - card.current.rotation.x) * ease
    }
    if (cardShadow.current) cardShadow.current.position.y += (cardY - cardShadow.current.position.y) * ease
  })

  return (
    <group onClick={onToggle} rotation={[-0.12, 0, 0]}>
      <group ref={cardShadow} position={[0.12, 0.12, -0.02]}>
        <RoundedBox args={[4.08, 5.16, 0.07]} radius={0.035} smoothness={4}>
          <meshStandardMaterial color="#c4a989" transparent opacity={0.24} />
        </RoundedBox>
      </group>
      <group ref={card} position={[0, 0.12, 0.02]}>
        <RoundedBox args={[4.08, 5.16, 0.08]} radius={0.035} smoothness={4}>
          <meshPhysicalMaterial color="#fffdf9" clearcoat={0.38} clearcoatRoughness={0.4} roughness={0.87} />
        </RoundedBox>
        <mesh position={[0, 1.96, 0.06]}>
          <boxGeometry args={[2.68, 0.018, 0.016]} />
          <meshStandardMaterial color="#b9775b" />
        </mesh>
        <Text anchorX="center" color="#9f624a" fontSize={0.12} letterSpacing={0.17} position={[0, 1.55, 0.07]}>TRÂN TRỌNG KÍNH MỜI</Text>
        <Text anchorX="center" color="#3b2d26" fontSize={0.46} letterSpacing={-0.05} position={[0, 0.8, 0.07]}>NGỌC AN</Text>
        <Text anchorX="center" color="#b9775b" fontSize={0.28} position={[0, 0.28, 0.07]}>&</Text>
        <Text anchorX="center" color="#3b2d26" fontSize={0.46} letterSpacing={-0.05} position={[0, -0.2, 0.07]}>MINH KHANG</Text>
        <Text anchorX="center" color="#3b2d26" fontSize={0.12} letterSpacing={0.08} position={[0, -1.05, 0.07]}>24 · 10 · 2026</Text>
        <Text anchorX="center" color="#9f624a" fontSize={0.1} letterSpacing={0.08} position={[0, -1.38, 0.07]}>18:00 · SÀI GÒN</Text>
        <mesh position={[0, -1.83, 0.07]}>
          <boxGeometry args={[1.72, 0.014, 0.012]} />
          <meshStandardMaterial color="#dcc4a9" />
        </mesh>
      </group>

      <RoundedBox args={[5.24, 3.46, 0.16]} radius={0.055} smoothness={4} position={[0, 0, -0.12]}>
        <meshPhysicalMaterial color="#e6d5bf" clearcoat={0.25} clearcoatRoughness={0.54} roughness={0.82} />
      </RoundedBox>
      <mesh position={[0, 0, 0.05]}>
        <shapeGeometry args={[lowerFoldShape]} />
        <meshStandardMaterial color="#dfc9ad" roughness={0.9} />
      </mesh>
      <group ref={flap} position={[0, 1.69, 0.08]}>
        <mesh>
          <shapeGeometry args={[topFlapShape]} />
          <meshStandardMaterial color="#eadbc9" roughness={0.87} side={2} />
        </mesh>
      </group>
      <mesh position={[0, -0.1, 0.18]}>
        <sphereGeometry args={[0.21, 32, 32]} />
        <meshPhysicalMaterial color="#b9775b" clearcoat={0.72} clearcoatRoughness={0.2} roughness={0.42} />
      </mesh>
    </group>
  )
}

export default function InvitationScene({ isOpen, onToggle }: InvitationSceneProps) {
  return (
    <Canvas camera={{ fov: 29, position: [0, 0.45, 9.4] }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={2.25} />
      <directionalLight color="#fff1df" intensity={3.2} position={[4, 5, 5]} />
      <pointLight color="#c98b6d" intensity={5.5} position={[-3, -2, 3]} />
      <Envelope isOpen={isOpen} onToggle={onToggle} />
    </Canvas>
  )
}
