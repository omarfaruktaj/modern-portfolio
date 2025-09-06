"use client";

import { useEffect, useRef, useState } from "react";

export default function SmoothFollower() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const dotPosition = useRef({ x: 0, y: 0 });
  const borderDotPosition = useRef({ x: 0, y: 0 });

  const [renderPos, setRenderPos] = useState({
    dot: { x: 0, y: 0 },
    border: { x: 0, y: 0 },
  });

  const [isHovering, setIsHovering] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const [cursorType, setCursorType] = useState("default");
  const [isClient, setIsClient] = useState(false);

  const DOT_SMOOTHNESS = 0.2;
  const BORDER_DOT_SMOOTHNESS = 0.1;
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };

      const element = document.elementFromPoint(
        e.clientX,
        e.clientY
      ) as HTMLElement | null;
      if (element) {
        const computedCursor = getComputedStyle(element).cursor;
        setCursorType(computedCursor || "default");
      }
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // ✅ FIXED: Detect when mouse leaves browser window
    const handleMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        setIsCursorVisible(false);
        document.body.style.cursor = "";
      }
    };

    // ✅ FIXED: Detect when mouse re-enters window
    const handleMouseOver = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        setIsCursorVisible(true);
        document.body.style.cursor = "none";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseover", handleMouseOver);

    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, img"
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    const animate = () => {
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      dotPosition.current.x = lerp(
        dotPosition.current.x,
        mousePosition.current.x,
        DOT_SMOOTHNESS
      );
      dotPosition.current.y = lerp(
        dotPosition.current.y,
        mousePosition.current.y,
        DOT_SMOOTHNESS
      );

      borderDotPosition.current.x = lerp(
        borderDotPosition.current.x,
        mousePosition.current.x,
        BORDER_DOT_SMOOTHNESS
      );
      borderDotPosition.current.y = lerp(
        borderDotPosition.current.y,
        mousePosition.current.y,
        BORDER_DOT_SMOOTHNESS
      );

      setRenderPos({
        dot: { x: dotPosition.current.x, y: dotPosition.current.y },
        border: {
          x: borderDotPosition.current.x,
          y: borderDotPosition.current.y,
        },
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    // Initially hide system cursor
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseover", handleMouseOver);

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });

      cancelAnimationFrame(animationId);
      document.body.style.cursor = "";
    };
  }, []);

  if (!isClient || !isCursorVisible) return null;

  const getCursorStyle = () => {
    switch (cursorType) {
      case "pointer":
        return {
          border: "2px solid #0ea5e9",
          transform: "translate(-50%, -50%) scale(1.2)",
        };
      case "text":
        return {
          border: "2px dashed #10b981",
          transform: "translate(-50%, -50%) scale(1.1)",
        };
      case "not-allowed":
        return {
          border: "2px solid #ef4444",
          opacity: 0.5,
        };
      default:
        return {
          border: "2px solid black",
        };
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Dot */}
      <div
        className="absolute rounded-full bg-black dark:bg-white transition-all duration-150"
        style={{
          width: "8px",
          height: "8px",
          transform: "translate(-50%, -50%)",
          left: `${renderPos.dot.x}px`,
          top: `${renderPos.dot.y}px`,
        }}
      />

      {/* Border */}
      <div
        className="absolute rounded-full transition-all duration-150"
        style={{
          width: isHovering ? "34px" : "28px",
          height: isHovering ? "34px" : "28px",
          left: `${renderPos.border.x}px`,
          top: `${renderPos.border.y}px`,
          transform: getCursorStyle().transform || "translate(-50%, -50%)",
          border: getCursorStyle().border,
          opacity: getCursorStyle().opacity ?? 1,
        }}
      />
    </div>
  );
}
