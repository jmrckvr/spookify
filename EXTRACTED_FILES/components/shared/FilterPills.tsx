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
            "filter-pill",
            activeOption === option
              ? "filter-pill-active"
              : "filter-pill-inactive"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default FilterPills;
