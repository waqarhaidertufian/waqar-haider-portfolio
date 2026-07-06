import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import SkillCard from "./SkillCard";
import { Skill } from "../../data/skills";

interface InfiniteSkillRowProps {
  skills: Skill[];
}

export default function InfiniteSkillRow({ skills }: InfiniteSkillRowProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollDistance, setScrollDistance] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate scroll distance based on actual content width
  useEffect(() => {
    if (trackRef.current) {
      const trackWidth = trackRef.current.scrollWidth;
      // Scroll distance should be the width of one complete set of skills
      // With 8 duplicates, one set is 1/8 of the total width
      setScrollDistance(trackWidth / 8);
    }
  }, [skills]);

  // Desktop: 8s, Mobile: 0.53s (5x faster than previous mobile speed)
  const duration = isMobile ? 0.53 : 8;

  // Duplicate skills for seamless infinite loop
  // Use more duplicates to ensure smooth scrolling in portrait mode
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills, ...skills, ...skills, ...skills, ...skills];

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  return (
    <div 
      className="relative overflow-hidden w-full"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onTouchStart={handlePause}
      onTouchEnd={handleResume}
    >
      <motion.div
        ref={trackRef}
        className="flex gap-4"
        animate={{
          x: isPaused ? 0 : [0, -scrollDistance]
        }}
        transition={{
          x: {
            duration,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }
        }}
        style={{
          willChange: "transform",
          transform: "translate3d(0, 0, 0)"
        }}
      >
        {duplicatedSkills.map((skill, index) => (
          <SkillCard 
            key={`${skill.name}-${index}`} 
            skill={skill} 
            index={index % skills.length}
          />
        ))}
      </motion.div>
    </div>
  );
}
