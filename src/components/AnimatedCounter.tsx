"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
}

export default function AnimatedCounter({ value }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  const prefix = match ? match[1] : "";
  const numValue = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] : value;

  const springValue = useSpring(0, {
    stiffness: 40,
    damping: 15,
  });

  useEffect(() => {
    if (isInView && numValue > 0) {
      springValue.set(numValue);
    }
  }, [isInView, numValue, springValue]);

  const displayValue = useTransform(springValue, (current) => {
    return Math.floor(current).toString();
  });

  if (!match) {
    return <span>{value}</span>;
  }

  return (
    <span ref={ref} className="inline-flex items-center">
      {prefix}
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}
