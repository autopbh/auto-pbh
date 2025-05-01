
import { Car } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Vehicle } from "@/types";

interface BrandFilterProps {
  onBrandSelect: (brand: string) => void;
  vehicles: Vehicle[];
}

const BrandFilter = ({ onBrandSelect, vehicles }: BrandFilterProps) => {
  const { t } = useLanguage();
  const brands = ["Mercedes-Benz", "BMW", "Audi", "Porsche", "Ford", "Jaguar"];

  return (
    <div className="bg-white/70 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        <Car className="h-6 w-6 text-autop-red" />
        <h3 className="text-xl font-semibold">{t("search.byBrand")}</h3>
      </div>
      <ul className="space-y-2">
        {brands.map((brand) => (
          <li 
            key={brand}
            className="flex items-center justify-between hover:bg-muted/50 p-2 rounded cursor-pointer transition-colors"
            onClick={() => onBrandSelect(brand)}
          >
            <span>{brand}</span>
            <span className="text-muted-foreground">
              {vehicles.filter(v => v.brand === brand).length} {t("search.models")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandFilter;
