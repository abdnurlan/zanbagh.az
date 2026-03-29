"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Petal({
  position,
  rotation,
  scale,
  color,
  speed,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.position.y = initialY + Math.sin(t) * 0.3;
    meshRef.current.rotation.z = rotation[2] + Math.sin(t * 0.7) * 0.2;
    meshRef.current.rotation.y += 0.003 * speed;
    meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.15;
  });

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.3, 0.3, 0.5, 0.7, 0, 1.2);
    shape.bezierCurveTo(-0.5, 0.7, -0.3, 0.3, 0, 0);
    return new THREE.ShapeGeometry(shape, 12);
  }, []);

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.75}
        roughness={0.3}
        metalness={0.05}
      />
    </mesh>
  );
}

function FloatingFlower({
  position,
  scale,
  speed,
  petalColor,
  centerColor,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  petalColor: string;
  centerColor: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const petalCount = 6;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * speed * 0.3;
    groupRef.current.rotation.z = Math.sin(t) * 0.15;
    groupRef.current.rotation.x = Math.sin(t * 0.7) * 0.1;
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.4;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i / petalCount) * Math.PI * 2;
        return (
          <Petal
            key={i}
            position={[Math.cos(angle) * 0.15, Math.sin(angle) * 0.15, 0]}
            rotation={[0, 0, angle + Math.PI / 2]}
            scale={0.5}
            color={petalColor}
            speed={speed}
          />
        );
      })}
      <mesh position={[0, 0, 0.05]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={centerColor} roughness={0.4} metalness={0.1} />
      </mesh>
    </group>
  );
}

function FloatingRose({
  position,
  scale,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const layers = 5;

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime * speed * 0.2;
    groupRef.current.rotation.y += 0.005 * speed;
    groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed * 0.4) * 0.5;
    groupRef.current.rotation.x = Math.sin(t) * 0.08;
  });

  const roseGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.4, 0.1, 0.6, 0.5, 0.3, 0.8);
    shape.bezierCurveTo(0, 1.1, -0.4, 0.8, -0.3, 0.5);
    shape.bezierCurveTo(-0.5, 0.2, -0.2, -0.1, 0, 0);
    return new THREE.ShapeGeometry(shape, 16);
  }, []);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {Array.from({ length: layers }).map((_, layerIdx) => {
        const petalsInLayer = 5 + layerIdx;
        const layerRadius = 0.1 + layerIdx * 0.22;
        const layerAngleOffset = (layerIdx * Math.PI) / petalsInLayer;
        return Array.from({ length: petalsInLayer }).map((__, petalIdx) => {
          const angle = (petalIdx / petalsInLayer) * Math.PI * 2 + layerAngleOffset;
          const x = Math.cos(angle) * layerRadius;
          const y = Math.sin(angle) * layerRadius;
          const z = layerIdx * 0.04;
          const alpha = 0.9 - layerIdx * 0.1;
          return (
            <mesh
              key={`${layerIdx}-${petalIdx}`}
              position={[x, y, z]}
              rotation={[0.2 * layerIdx, 0, angle + Math.PI / 2]}
              geometry={roseGeometry}
              scale={0.35 + layerIdx * 0.04}
            >
              <meshStandardMaterial
                color="#e8a4b0"
                side={THREE.DoubleSide}
                transparent
                opacity={alpha}
                roughness={0.25}
                metalness={0.02}
              />
            </mesh>
          );
        });
      })}
    </group>
  );
}

function MouseLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const { mouse, viewport } = useThree();

  useFrame(() => {
    if (!lightRef.current) return;
    lightRef.current.position.x += (mouse.x * viewport.width * 0.5 - lightRef.current.position.x) * 0.08;
    lightRef.current.position.y += (mouse.y * viewport.height * 0.5 - lightRef.current.position.y) * 0.08;
  });

  return <pointLight ref={lightRef} position={[0, 0, 4]} intensity={1.2} color="#ffd0da" distance={14} />;
}

function Scene() {
  const flowers = useMemo(
    () => [
      { pos: [-3.5, 1.5, -2] as [number,number,number], scale: 0.7, speed: 0.6, type: "flower", petalColor: "#e8607a", centerColor: "#c94060" },
      { pos: [3.2, -1, -3] as [number,number,number], scale: 0.85, speed: 0.5, type: "flower", petalColor: "#f28fa0", centerColor: "#c94060" },
      { pos: [-1.5, -2.5, -1.5] as [number,number,number], scale: 0.5, speed: 0.7, type: "flower", petalColor: "#c94060", centerColor: "#8c3050" },
      { pos: [0.5, 3, -6] as [number,number,number], scale: 1.1, speed: 0.35, type: "rose", petalColor: "#e8607a", centerColor: "#c94060" },
      { pos: [-2.8, 2.8, -4] as [number,number,number], scale: 0.85, speed: 0.5, type: "rose", petalColor: "#f28fa0", centerColor: "#e8607a" },
      { pos: [3.5, -2.5, -5] as [number,number,number], scale: 0.9, speed: 0.45, type: "rose", petalColor: "#c94060", centerColor: "#8c3050" },
    ],
    []
  );

  return (
    <>
      <ambientLight intensity={1.8} color="#fff0f3" />
      <directionalLight position={[5, 8, 5]} intensity={0.6} color="#ffd0da" />
      <MouseLight />

      <Sparkles
        count={50}
        scale={[14, 9, 7]}
        size={0.6}
        speed={0.2}
        color="#e8607a"
        opacity={0.35}
      />

      <fog attach="fog" args={["#fdf8f5", 8, 20]} />

      {flowers.map((f, i) =>
        f.type === "rose" ? (
          <FloatingRose
            key={i}
            position={f.pos}
            scale={f.scale}
            speed={f.speed}
          />
        ) : (
          <FloatingFlower
            key={i}
            position={f.pos}
            scale={f.scale}
            speed={f.speed}
            petalColor={f.petalColor}
            centerColor={f.centerColor}
          />
        )
      )}
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      dpr={[1, 1.2]}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
