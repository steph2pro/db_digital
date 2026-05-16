import React from "react";
import { motion } from "motion/react";
import { CATEGORIES } from "../../../data/realisationsData";

interface RealisationsFiltersProps {
  activeFilter: string;
  lang: "fr" | "en";
  isDark: boolean;
  isMobile: boolean;
  onFilterChange: (filter: string) => void;
}

export const RealisationsFilters: React.FC<RealisationsFiltersProps> = ({
  activeFilter,
  lang,
  isDark,
  isMobile,
  onFilterChange,
}) => {
  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: isMobile ? "0 24px 32px" : "0 80px 40px",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {Object.entries(CATEGORIES).map(([key, cat]) => {
          const isActive = activeFilter === key;
          return (
            <button
              key={key}
              onClick={() => onFilterChange(key)}
              style={{
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                padding: "8px 18px",
                borderRadius: 100,
                border: "1px solid",
                whiteSpace: "nowrap",
                transition: "all 0.22s ease",
                backgroundColor: isActive
                  ? (isDark ? "#fff" : "#0a0a0a")
                  : "transparent",
                borderColor: isActive
                  ? "transparent"
                  : (isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"),
                color: isActive
                  ? (isDark ? "#0a0a0a" : "#fff")
                  : (isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"),
              }}
            >
              {cat[lang]}
            </button>
          );
        })}
      </motion.div>
    </div>
  );
};