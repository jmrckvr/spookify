import React from "react";
import { cn } from "@/lib/utils";

interface FilterPillsProps {
  options: string[];
  activeOption: string;
  onChange: (option: string) => void;
}

const FilterPills: React.FC<FilterPillsProps> = ({
  options,
  activeOption,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all",
            activeOption === option
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-foreground hover:bg-secondary/80"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default FilterPills;
