import { useState } from "react";
import { motion, useAnimation } from "motion/react";
import SkillCard from "./SkillCard";
import { Skill } from "../../data/skills";

interface InfiniteSkillRowProps {
  skills: Skill[];
}

export default function InfiniteSkillRow({ skills }: InfiniteSkillRowProps) {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimation();

  // Duplicate skills for seamless infinite loop
  // We need enough duplicates to fill the screen and create smooth transitions
  const duplicatedSkills = [...skills, ...skills, ...skills, ...skills];

  const handleMouseEnter = () => {
    setIsPaused(true);
    controls.stop();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    controls.start({
      x: ["0%", "-25%"],
      transition: {
        duration: 30,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop"
      }
    });
  };

  return (
    <div 
      className="relative overflow-hidden w-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="flex gap-4"
        initial={{ x: 0 }}
        animate={controls}
        onAnimationComplete={() => {
          if (!isPaused) {
            controls.start({
              x: ["0%", "-25%"],
              transition: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop"
              }
            });
          }
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
