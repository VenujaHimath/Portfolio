"use client";

import { useEffect, useState } from "react";

const MODEL_PATH = "/robot.glb";

export type RobotModelStatus = "checking" | "available" | "missing";

/** Avoid 404 + console errors by checking the file before useGLTF runs */
export function useRobotModelAvailable(): RobotModelStatus {
  const [status, setStatus] = useState<RobotModelStatus>("checking");

  useEffect(() => {
    let cancelled = false;

    fetch(MODEL_PATH, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setStatus(res.ok ? "available" : "missing");
      })
      .catch(() => {
        if (!cancelled) setStatus("missing");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return status;
}

export const ROBOT_MODEL_PATH = MODEL_PATH;
