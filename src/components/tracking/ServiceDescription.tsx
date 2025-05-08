
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ServiceDescription: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-autop-red">{t("services.delivery.title")}</h2>
      <p className="text-lg mb-6">
        {t("tracking.service.description")}
      </p>
      
      <div className="bg-autop-red/5 p-6 rounded-lg mb-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-autop-red mt-1 shrink-0" />
          <div>
            <h3 className="font-medium mb-1">{t("tracking.orderNumber.title")}</h3>
            <p className="text-muted-foreground text-sm">
              {t("tracking.orderNumber.description")}
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground mt-2 space-y-1">
              <li>{t("tracking.orderNumber.location1")}</li>
              <li>{t("tracking.orderNumber.location2")}</li>
              <li>{t("tracking.orderNumber.location3")}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceDescription;
