import { motion } from "motion/react";
import { Skill } from "../../data/skills";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export default function SkillCard({ skill, index }: SkillCardProps) {
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.03,
        ease: [0.16, 1, 0.3, 1]
      }}
      whileHover={{ 
        y: -12,
        scale: 1.05,
        boxShadow: `0 20px 40px -15px ${skill.color}40`,
        borderColor: skill.color
      }}
      className="relative glass-panel rounded-xl p-4 border-2 shadow-lg overflow-hidden group select-none cursor-pointer flex flex-col items-center justify-center w-32 h-32 shrink-0"
      style={{
        boxShadow: "0 10px 30px -15px rgba(0,0,0,0.5)",
        borderColor: `${skill.color}40`
      }}
    >
      {/* Icon container with floating animation */}
      <motion.div
        whileHover={{ rotate: 360 }}
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 bg-white/[0.02] mb-2"
        style={{
          boxShadow: "inset 0 1px 3px rgba(255,255,255,0.05)"
        }}
      >
        <Icon
          className="w-5 h-5 text-slate-300"
          style={{ color: skill.color }}
        />
      </motion.div>

      {/* Skill labels */}
      <div className="text-center">
        <h3 className="font-display font-bold text-xs text-white line-clamp-1">
          {skill.name}
        </h3>
        <p className="text-[8px] font-mono tracking-wider text-slate-500 uppercase mt-0.5">
          {skill.category}
        </p>
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at center, ${skill.color}20 0%, transparent 70%)`
        }}
      />
    </motion.div>
  );
}
