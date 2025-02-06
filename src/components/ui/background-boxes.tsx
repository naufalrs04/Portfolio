"use client";
import React, { useMemo, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
  
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
  
    mediaQuery.addEventListener("change", handleChange);
    setIsMobile(mediaQuery.matches);
  
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  
  const rows = new Array(isMobile ? 0 : 80).fill(1);
  const cols = new Array(isMobile ? 0 : 60).fill(1);

  const colors = useMemo(
    () => [
      "#FF6F61",
      "#6EC1E4",
      "#9B4F96",
      "#F9A825",
      "#64B5F6",
      "#D1C4E9",
    ],
    []
  );
  

  const getRandomColor = useCallback(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, [colors]);
  

  const motionConfig = useMemo(
    () => ({
      whileHover: !isMobile
        ? {
            backgroundColor: `var(${getRandomColor()})`,
            transition: { duration: 0 },
          }
        : {},
      animate: {
        transition: { duration: 2 },
      },
    }),
    [isMobile, getRandomColor]
  );

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(${
          isMobile ? 0.5 : 0.675
        }) rotate(-6deg) translateZ(0)`,
        willChange: "transform",
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0",
        className
      )}
      {...rest}
    >
      {rows.map((_, i) => (
        <motion.div
          key={`row${i}`}
          className="w-16 h-8 border-l border-slate-700/[0.1] relative z-0"
          initial={false}
        >
          {cols.map((_, j) => (
            <motion.div
              key={`col${j}`}
              {...motionConfig}
              className="w-16 h-8 border-r border-t border-slate-700/[0.2] relative"
            >
              {(!isMobile && j % 2 === 0 && i % 2 === 0) ||
              (isMobile && j % 4 === 0 && i % 4 === 0) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-700/[0.2] stroke-[1px] pointer-events-none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v12m6-6H6"
                  />
                </svg>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);