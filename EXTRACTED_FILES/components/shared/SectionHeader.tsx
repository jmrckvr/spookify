import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  showAll?: boolean;
  allLink?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  showAll = false,
  allLink,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      {showAll && allLink && (
        <Link
          to={allLink}
          className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Show all
          <ChevronRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
