
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SearchAssistance = () => {
  const { t } = useLanguage();

  return (
    <section className="text-center p-8">
      <p className="text-muted-foreground mb-4">{t("search.assistance")}</p>
      <Button variant="outline" className="gap-2">
        <Mic className="h-4 w-4" />
        {t("search.voiceSearch")}
      </Button>
    </section>
  );
};

export default SearchAssistance;
