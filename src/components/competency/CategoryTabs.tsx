import { motion } from "motion/react";
import { CATEGORY_MAP, Category } from "../../data/skills";

interface CategoryTabsProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

export default function CategoryTabs({ selectedCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap items-center justify-center gap-2 mb-12"
    >
      {Object.entries(CATEGORY_MAP).map(([key, config], index) => {
        const isSelected = selectedCategory === key;
        const Icon = config.icon;
        return (
          <motion.button
            key={key}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.8 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onCategoryChange(key as Category)}
            className={`relative px-4 py-2 rounded-full font-sans font-medium text-xs tracking-wider uppercase transition-colors flex items-center gap-2 ${
              isSelected ? "text-cyan-400 border-cyan-400/20" : "text-slate-400 hover:text-white"
            }`}
            aria-label={`Show ${config.label}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isSelected && (
              <motion.span
                layoutId="stackTabHighlight"
                className="absolute inset-0 bg-cyan-950/20 border border-cyan-400/20 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span className="relative z-10">{config.label}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
