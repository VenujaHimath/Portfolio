"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { robotMouse } from "@/lib/robot-mouse";

const MAX_YAW = 0.5;
const MAX_PITCH = 0.35;
const LERP = 0.08;

/** Shown when public/robot.glb is missing or fails to load */
export function PlaceholderRobot() {
  const head = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!head.current) return;
    const yaw = THREE.MathUtils.clamp(robotMouse.x * MAX_YAW, -MAX_YAW, MAX_YAW);
    const pitch = THREE.MathUtils.clamp(
      robotMouse.y * MAX_PITCH,
      -MAX_PITCH,
      MAX_PITCH
    );
    head.current.rotation.y = THREE.MathUtils.lerp(
      head.current.rotation.y,
      yaw,
      LERP
    );
    head.current.rotation.x = THREE.MathUtils.lerp(
      head.current.rotation.x,
      pitch,
      LERP
    );
  });

  return (
    <group position={[0, -0.2, 0]}>
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 1.1, 0.45]} />
        <meshStandardMaterial color="#1A1A24" metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0, 1.35, 0]} castShadow receiveShadow>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial color="#7F77DD" metalness={0.5} roughness={0.35} />
      </mesh>
      <group ref={head} position={[0, 1.35, 0]}>
        <mesh position={[0.22, 0.08, 0.32]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#1D9E75" emissive="#1D9E75" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[-0.22, 0.08, 0.32]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#1D9E75" emissive="#1D9E75" emissiveIntensity={0.6} />
        </mesh>
      </group>
      <mesh position={[0.35, 0.9, 0]} rotation={[0, 0, -0.4]} castShadow>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color="#2A2A36" />
      </mesh>
      <mesh position={[-0.35, 0.9, 0]} rotation={[0, 0, 0.4]} castShadow>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color="#2A2A36" />
      </mesh>
    </group>
  );
}
