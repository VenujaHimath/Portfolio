"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const SPLINE_SCRIPT = "/spline/spline-viewer.js";
const SPLINE_SCENE =
  "https://prod.spline.design/dHNzNCsiJiXky5ZU/scene.splinecode";

/** 1 = Spline default; higher = larger (2× previous 0.62) */
const CAMERA_ZOOM = 1.24;
/** CSS fallback — 2× previous 0.68 */
const DISPLAY_SCALE = 1.36;

type SplineViewerEl = HTMLElement & {
  _spline?: { setZoom?: (zoom: number) => void };
  application?: { setZoom?: (zoom: number) => void };
};

function applyCameraZoom(viewer: SplineViewerEl | null) {
  if (!viewer) return false;
  const app = viewer._spline ?? viewer.application;
  if (typeof app?.setZoom === "function") {
    app.setZoom(CAMERA_ZOOM);
    return true;
  }
  return false;
}

function loadSplineScript(): Promise<void> {
  if (typeof customElements !== "undefined" && customElements.get("spline-viewer")) {
    return Promise.resolve();
  }

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${SPLINE_SCRIPT}"]`
  );
  if (existing?.dataset.loaded === "true") {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = existing ?? document.createElement("script");
    script.src = SPLINE_SCRIPT;
    script.type = "module";
    script.async = true;

    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () =>
      reject(new Error(`Failed to load ${SPLINE_SCRIPT}`));

    if (!existing) {
      document.head.appendChild(script);
    }
  });
}

export function SplineViewer() {
  const viewerRef = useRef<SplineViewerEl | null>(null);
  const [viewerReady, setViewerReady] = useState(false);
  const [useDisplayScale, setUseDisplayScale] = useState(true);

  useEffect(() => {
    let cancelled = false;
    loadSplineScript()
      .then(() => {
        if (!cancelled) setViewerReady(true);
      })
      .catch((err) => {
        console.error("[SplineViewer]", err);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !viewerReady) return;

    const tryZoom = () => {
      if (applyCameraZoom(viewer)) {
        setUseDisplayScale(false);
        return true;
      }
      return false;
    };

    const onLoad = () => tryZoom();
    viewer.addEventListener("load", onLoad);

    let attempts = 0;
    const poll = window.setInterval(() => {
      if (tryZoom() || ++attempts > 40) {
        window.clearInterval(poll);
        if (!applyCameraZoom(viewer)) setUseDisplayScale(true);
      }
    }, 150);

    return () => {
      viewer.removeEventListener("load", onLoad);
      window.clearInterval(poll);
    };
  }, [viewerReady]);

  return (
    <div className="spline-hero-frame">
      <div
        className="spline-hero-stage"
        style={
          useDisplayScale
            ? ({ "--spline-display-scale": DISPLAY_SCALE } as CSSProperties)
            : undefined
        }
        data-css-scale={useDisplayScale ? "true" : "false"}
      >
        {viewerReady && (
          <spline-viewer
            ref={(node) => {
              viewerRef.current = node;
            }}
            url={SPLINE_SCENE}
            loading="eager"
            className="spline-hero-viewer"
          />
        )}
      </div>

      <div
        className="spline-badge-cover pointer-events-none absolute bottom-0 right-0 z-20"
        aria-hidden
      >
        <div className="grid-pattern absolute inset-0 opacity-50" />
      </div>
    </div>
  );
}
