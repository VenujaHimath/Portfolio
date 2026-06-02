"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Center } from "@react-three/drei";
import * as THREE from "three";
import { robotMouse } from "@/lib/robot-mouse";
import { useRobotModelAvailable, ROBOT_MODEL_PATH } from "@/lib/use-robot-model";
import { PlaceholderRobot } from "./PlaceholderRobot";

const HEAD_BONE_PATTERNS = [
  "Head",
  "head",
  "Neck",
  "neck",
  "mixamorigHead",
  "mixamorigNeck",
  "BoneHead",
  "RobotHead",
  "head_bone",
];

const WAVE_CLIP_PATTERNS = /wave|greet|hello|hi|salute|idle|punch/i;

const MAX_YAW = 0.65;
const MAX_PITCH = 0.4;
const LERP = 0.08;

function findHeadBone(root: THREE.Object3D): THREE.Bone | null {
  let found: THREE.Bone | null = null;

  root.traverse((obj) => {
    if (found) return;
    if (!(obj instanceof THREE.Bone)) return;

    const match = HEAD_BONE_PATTERNS.some(
      (pattern) =>
        obj.name === pattern ||
        obj.name.toLowerCase().includes(pattern.toLowerCase())
    );

    if (match) found = obj;
  });

  return found;
}

function pickWaveAction(
  actions: Record<string, THREE.AnimationAction | null>
): THREE.AnimationAction | null {
  const entries = Object.entries(actions).filter(([, a]) => a != null) as [
    string,
    THREE.AnimationAction,
  ][];

  if (entries.length === 0) return null;

  const wave = entries.find(([name]) => WAVE_CLIP_PATTERNS.test(name));
  return wave ? wave[1] : entries[0][1];
}

function GLTFModel() {
  const group = useRef<THREE.Group>(null);
  const headBone = useRef<THREE.Bone | null>(null);
  const baseRotation = useRef({ x: 0, y: 0, z: 0 });
  const baseGroupY = useRef(0);

  const { scene, animations } = useGLTF(ROBOT_MODEL_PATH);
  const model = useMemo(() => scene.clone(true), [scene]);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    model.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const materials = Array.isArray(mesh.material)
          ? mesh.material
          : [mesh.material];

        materials.forEach((mat) => {
          if (!mat || !("isMeshStandardMaterial" in mat)) return;
          const std = mat as THREE.MeshStandardMaterial;
          std.metalness = Math.min(std.metalness, 0.85);
          std.roughness = Math.max(std.roughness, 0.25);
          if (std.emissive) {
            std.emissiveIntensity = Math.max(std.emissiveIntensity, 1.5);
          }
        });
      }
    });

    const bone = findHeadBone(model);
    headBone.current = bone;

    if (bone) {
      baseRotation.current = {
        x: bone.rotation.x,
        y: bone.rotation.y,
        z: bone.rotation.z,
      };
    }
  }, [model]);

  useEffect(() => {
    const wave = pickWaveAction(actions);
    if (!wave) return;

    wave.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.4).play();

    return () => {
      wave.fadeOut(0.3);
    };
  }, [actions]);

  useFrame(() => {
    const targetYaw = THREE.MathUtils.clamp(
      robotMouse.x * MAX_YAW,
      -MAX_YAW,
      MAX_YAW
    );
    const targetPitch = THREE.MathUtils.clamp(
      robotMouse.y * MAX_PITCH,
      -MAX_PITCH,
      MAX_PITCH
    );

    const bone = headBone.current;
    if (bone) {
      const base = baseRotation.current;
      bone.rotation.y = THREE.MathUtils.lerp(
        bone.rotation.y,
        base.y + targetYaw,
        LERP
      );
      bone.rotation.x = THREE.MathUtils.lerp(
        bone.rotation.x,
        base.x + targetPitch,
        LERP
      );
      return;
    }

    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        baseGroupY.current + targetYaw,
        LERP
      );
    }
  });

  return (
    <group ref={group}>
      <Center bottom scale={2.2} position={[0, -0.4, 0]}>
        <primitive object={model} rotation={[0, Math.PI / 6, 0]} />
      </Center>
    </group>
  );
}

export function InteractiveRobot() {
  const status = useRobotModelAvailable();

  useEffect(() => {
    if (status === "available") {
      useGLTF.preload(ROBOT_MODEL_PATH);
    }
  }, [status]);

  if (status === "checking") {
    return null;
  }

  if (status === "missing") {
    return <PlaceholderRobot />;
  }

  return <GLTFModel />;
}
