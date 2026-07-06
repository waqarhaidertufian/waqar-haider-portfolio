import { motion } from "motion/react";
import SkillCard from "./SkillCard";
import { Skill } from "../../data/skills";

interface InfiniteSkillRowProps {
  skills: Skill[];
}

export default function InfiniteSkillRow({ skills }: InfiniteSkillRowProps) {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
      >
        {skills.map((skill, index) => (
          <SkillCard 
            key={skill.name} 
            skill={skill} 
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
}
