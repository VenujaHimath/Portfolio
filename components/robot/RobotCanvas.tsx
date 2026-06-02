"use client";

import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { InteractiveRobot } from "./InteractiveRobot";
import { setRobotMouseFromEvent } from "@/lib/robot-mouse";

function Scene() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.25}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} color="#7F77DD" />
      <pointLight position={[0, 2, 2]} intensity={0.5} color="#1D9E75" />
      <pointLight position={[-1.5, 1.2, 1.5]} intensity={0.9} color="#3B82F6" />
      <pointLight position={[1.5, 0.5, -1]} intensity={0.4} color="#7F77DD" />

      <InteractiveRobot />

      <ContactShadows
        position={[0, -0.38, 0]}
        opacity={0.5}
        scale={6}
        blur={2.5}
        far={4}
        color="#0a0a0f"
      />
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent-primary border-t-transparent" />
    </div>
  );
}

export function RobotCanvas() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => setRobotMouseFromEvent(e.clientX, e.clientY);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="relative h-full w-full min-h-[280px] overflow-hidden rounded-2xl border border-surface-border/60 bg-background/40 shadow-glow">
      <div className="grid-pattern pointer-events-none absolute inset-0 opacity-30" />
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0.35, 2.75], fov: 48, near: 0.1, far: 100 }}
          gl={{ antialias: true, alpha: true }}
          className="!absolute inset-0"
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
