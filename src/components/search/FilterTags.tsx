
import { Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FilterTagsProps {
  onFilterSelect: (filter: string) => void;
}

const FilterTags = ({ onFilterSelect }: FilterTagsProps) => {
  const { t } = useLanguage();
  const filters = [
    t("search.filter.suvPremium"), 
    t("search.filter.lowMileage"), 
    t("search.filter.panoramicRoof"), 
    t("search.filter.recent"), 
    t("search.filter.hybrid"), 
    t("search.filter.sedan")
  ];

  return (
    <div className="bg-white/70 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <Filter className="h-6 w-6 text-autop-red" />
        <h3 className="text-xl font-semibold">{t("search.filters")}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map(filter => (
          <span 
            key={filter}
            className="bg-muted px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-muted/80 transition-colors"
            onClick={() => onFilterSelect(filter)}
          >
            {filter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FilterTags;
