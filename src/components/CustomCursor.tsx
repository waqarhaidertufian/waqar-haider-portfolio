import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  // High precision mouse values using Spring for Apple-like smoothness
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const haloX = useSpring(mouseX, springConfig);
  const haloY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Hidden on touchscreen devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 4);
      mouseY.set(e.clientY - 4);
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const onMouseEnter = () => {
      setVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Precision inner center cyan spot */}
      <motion.div
        className="fixed w-2 h-2 rounded-full bg-cyan-400 mix-blend-screen shadow-[0_0_10px_#06b6d4]"
        style={{
          left: mouseX,
          top: mouseY,
        }}
      />
      {/* Smooth magnetic trailing outer ring */}
      <motion.div
        className="fixed rounded-full border border-cyan-400/50 mix-blend-screen pointer-events-none"
        style={{
          left: haloX,
          top: haloY,
          transform: "translate(-14px, -14px)",
          width: hovered ? 40 : 32,
          height: hovered ? 40 : 32,
          backgroundColor: hovered ? "rgba(6, 182, 212, 0.12)" : "rgba(6, 182, 212, 0.01)",
          boxShadow: hovered ? "0 0 16px rgba(6, 182, 212, 0.3)" : "none",
        }}
      />
    </div>
  );
}
