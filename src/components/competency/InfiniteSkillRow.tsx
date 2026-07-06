import { useState } from "react";
import { motion } from "motion/react";
import SkillCard from "./SkillCard";
import { Skill } from "../../data/skills";

interface InfiniteSkillRowProps {
  skills: Skill[];
}

export default function InfiniteSkillRow({ skills }: InfiniteSkillRowProps) {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate skills for seamless infinite loop
  // We need enough duplicates to fill the screen and create smooth transitions
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

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
        className="flex gap-4"
        animate={{
          x: isPaused ? 0 : ["0%", "-25%"]
        }}
        transition={{
          x: {
            duration: 18,
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
