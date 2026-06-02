"use client";

import { useEffect, useState } from "react";

interface TypeWriterProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function TypeWriter({
  words,
  interval = 2500,
  className = "",
}: TypeWriterProps) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 60);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), interval);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 35);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, index, isDeleting, interval, words]);

  return (
    <span className={`font-mono text-accent-primary ${className}`}>
      {displayed}
      <span className="ml-0.5 inline-block h-[1em] w-[2px] animate-pulse bg-accent-primary align-middle" />
    </span>
  );
}
