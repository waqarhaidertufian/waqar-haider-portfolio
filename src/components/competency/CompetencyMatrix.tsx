import { useState, useMemo } from "react";
import { motion } from "motion/react";
import CategoryTabs from "./CategoryTabs";
import InfiniteSkillRow from "./InfiniteSkillRow";
import { SKILLS_DATA, CATEGORY_MAP, Category } from "../../data/skills";

export default function CompetencyMatrix() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  // Filter skills based on selected category
  const filteredSkills = useMemo(() => {
    if (selectedCategory === "all") {
      return SKILLS_DATA;
    }
    
    const categoryMap: Record<string, string> = {
      ai: "ai",
      deepLearning: "ai",
      frameworks: "frameworks",
      cloud: "cloud",
      linguistic: "linguistic",
      languages: "languages"
    };
    
    const targetCategory = categoryMap[selectedCategory] || selectedCategory;
    return SKILLS_DATA.filter(skill => skill.category === targetCategory);
  }, [selectedCategory]);

  return (
    <section id="stack" className="py-24 relative overflow-hidden font-sans">
      {/* Background gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.04),transparent_65%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.3em" }}
            animate={{ opacity: 1, letterSpacing: "0.3em" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-2"
          >
            CHAPTER 02 // INTELLIGENCE STACK
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight"
          >
            High Performance Core <span className="text-gradient-cyan-purple">Competency Matrix</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "3rem" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-slate-400 text-xs md:text-sm max-w-2xl mt-4"
          >
            Filter through the structural environments Waqar Haider utilizes daily to build AI systems and modern software.
          </motion.p>
        </motion.div>

        {/* Category Tabs */}
        <CategoryTabs 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Skills Grid */}
        <div className="relative pb-6 px-4">
          <InfiniteSkillRow skills={filteredSkills} />
        </div>
      </div>
    </section>
  );
}
