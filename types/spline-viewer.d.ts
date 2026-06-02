import type { DetailedHTMLProps, HTMLAttributes, Ref } from "react";

type SplineViewerProps = HTMLAttributes<HTMLElement> & {
  url?: string;
  loading?: "auto" | "lazy" | "eager";
  width?: number;
  height?: number;
  ref?: Ref<HTMLElement>;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": DetailedHTMLProps<SplineViewerProps, HTMLElement>;
    }
  }
}

export {};
