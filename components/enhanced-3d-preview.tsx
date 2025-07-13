"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, Maximize2 } from "lucide-react"
import type * as THREE from "three"

interface Enhanced3DPreviewProps {
  ingredients: any[]
  formulaName: string
  deliveryForm: string
}

function AnimatedBottle({ ingredients, formulaName }: { ingredients: any[]; formulaName: string }) {
  const bottleRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (bottleRef.current) {
      bottleRef.current.rotation.y = state.clock.elapsedTime * 0.3
      bottleRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group
      ref={bottleRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.1 : 1}
    >
      {/* Bottle Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 3, 16]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>

      {/* Bottle Cap */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[1.3, 1.3, 0.4, 16]} />
        <meshStandardMaterial color="#10b981" />
      </mesh>

      {/* Label */}
      <mesh position={[0, 0, 1.21]}>
        <planeGeometry args={[2, 1.5]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>

      {/* Formula Name Text */}
      <Text
        position={[0, 0.3, 1.22]}
        fontSize={0.15}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.ttf"
      >
        {formulaName}
      </Text>

      {/* Ingredient Count */}
      <Text
        position={[0, -0.1, 1.22]}
        fontSize={0.1}
        color="#64748b"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Regular.ttf"
      >
        {ingredients.length} Active Ingredients
      </Text>

      {/* FORMULA.ONE Brand */}
      <Text
        position={[0, -0.4, 1.22]}
        fontSize={0.08}
        color="#10b981"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.ttf"
      >
        FORMULA.ONE
      </Text>

      {/* Floating Ingredient Particles */}
      {ingredients.slice(0, 8).map((ingredient, index) => {
        const angle = (index / ingredients.length) * Math.PI * 2
        const radius = 2.5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = Math.sin(Date.now() * 0.001 + index) * 0.5

        return (
          <mesh key={ingredient.id} position={[x, y, z]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color={
                ingredient.category === "vitamins"
                  ? "#f59e0b"
                  : ingredient.category === "minerals"
                    ? "#8b5cf6"
                    : ingredient.category === "herbs"
                      ? "#10b981"
                      : "#3b82f6"
              }
              emissive={
                ingredient.category === "vitamins"
                  ? "#f59e0b"
                  : ingredient.category === "minerals"
                    ? "#8b5cf6"
                    : ingredient.category === "herbs"
                      ? "#10b981"
                      : "#3b82f6"
              }
              emissiveIntensity={0.2}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function PowderScoop({ ingredients, formulaName }: { ingredients: any[]; formulaName: string }) {
  const scoopRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (scoopRef.current) {
      scoopRef.current.rotation.y = state.clock.elapsedTime * 0.2
      scoopRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  return (
    <group ref={scoopRef}>
      {/* Scoop Handle */}
      <mesh position={[0, -0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.05, 0.05, 2, 8]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>

      {/* Scoop Bowl */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.8, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>

      {/* Powder in Scoop */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.7, 16, 8, 0, Math.PI * 2, 0, Math.PI / 3]} />
        <meshStandardMaterial
          color={ingredients.length > 5 ? "#fbbf24" : ingredients.length > 3 ? "#34d399" : "#60a5fa"}
        />
      </mesh>

      {/* Floating Powder Particles */}
      {Array.from({ length: 20 }).map((_, index) => {
        const angle = (index / 20) * Math.PI * 2
        const radius = 1.5 + Math.random() * 0.5
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = Math.sin(Date.now() * 0.002 + index) * 0.3 + 1

        return (
          <mesh key={index} position={[x, y, z]}>
            <sphereGeometry args={[0.02, 4, 4]} />
            <meshStandardMaterial
              color="#fbbf24"
              transparent
              opacity={0.6}
              emissive="#fbbf24"
              emissiveIntensity={0.1}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export function Enhanced3DPreview({ ingredients, formulaName, deliveryForm }: Enhanced3DPreviewProps) {
  const [resetCamera, setResetCamera] = useState(0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>3D Formula Preview</span>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setResetCamera(resetCamera + 1)}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="w-full h-96 bg-gradient-to-b from-stone-100 to-stone-200 rounded-lg overflow-hidden">
            <Canvas camera={{ position: [0, 2, 6], fov: 50 }} key={resetCamera}>
              <Environment preset="studio" />
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />

              {deliveryForm === "powder" ? (
                <PowderScoop ingredients={ingredients} formulaName={formulaName} />
              ) : (
                <AnimatedBottle ingredients={ingredients} formulaName={formulaName} />
              )}

              <OrbitControls enableZoom={true} enablePan={false} autoRotate={false} minDistance={3} maxDistance={10} />
            </Canvas>
          </div>

          {/* Ingredient Legend */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-stone-600">Vitamins</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-xs text-stone-600">Minerals</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="text-xs text-stone-600">Herbs</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-stone-600">Other</span>
            </div>
          </div>

          {/* Formula Stats */}
          <div className="mt-4 flex justify-between items-center">
            <div className="flex space-x-4">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                {ingredients.length} Ingredients
              </Badge>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 capitalize">
                {deliveryForm} Form
              </Badge>
            </div>
            <p className="text-xs text-stone-500">Drag to rotate • Scroll to zoom</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
