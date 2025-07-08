
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { useTrackingData } from "@/hooks/useTrackingData";
import ServiceDescription from "@/components/tracking/ServiceDescription";
import OrderNumberForm from "@/components/tracking/OrderNumberForm";
import RecoveryForm from "@/components/tracking/RecoveryForm";
import DebugPanel from "@/components/tracking/DebugPanel";
import TrackingInformation from "@/components/tracking/TrackingInformation";
import NotFoundDialog from "@/components/tracking/NotFoundDialog";

const Tracking = () => {
  const { t } = useLanguage();
  const {
    orderNumber,
    setOrderNumber,
    email,
    setEmail,
    isTracking,
    isLoading,
    showRecoveryForm,
    setShowRecoveryForm,
    isRecoverySent,
    order,
    showNotFoundDialog,
    setShowNotFoundDialog,
    debugMode,
    setDebugMode,
    allOrders,
    debugError,
    fetchAllOrders,
    handleSubmit,
    handleRecoverySubmit,
    createExampleOrder
  } = useTrackingData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">{t("tracking.personalizedTitle")}</h1>
          
          {/* Mode débogage */}
          <div className="mb-6">
            <Button 
              onClick={() => setDebugMode(!debugMode)} 
              variant="outline" 
              className="text-xs"
            >
              {debugMode ? t("tracking.hideDebugMode") : t("tracking.showDebugMode")}
            </Button>
          </div>
          
          {debugMode && (
            <DebugPanel 
              fetchAllOrders={fetchAllOrders}
              createExampleOrder={createExampleOrder}
              debugError={debugError}
              allOrders={allOrders}
              setOrderNumber={setOrderNumber}
            />
          )}
          
          <ServiceDescription />
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
            <OrderNumberForm 
              orderNumber={orderNumber}
              setOrderNumber={setOrderNumber}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              showRecoveryForm={showRecoveryForm}
              setShowRecoveryForm={setShowRecoveryForm}
            />
            
            {showRecoveryForm && (
              <RecoveryForm 
                isRecoverySent={isRecoverySent}
                email={email}
                setEmail={setEmail}
                handleRecoverySubmit={handleRecoverySubmit}
                isLoading={isLoading}
                setShowRecoveryForm={setShowRecoveryForm}
              />
            )}
          </section>

          {isTracking && order && (
            <TrackingInformation order={order} />
          )}
        </div>
      </div>

      <NotFoundDialog 
        showNotFoundDialog={showNotFoundDialog}
        setShowNotFoundDialog={setShowNotFoundDialog}
        orderNumber={orderNumber}
        setShowRecoveryForm={setShowRecoveryForm}
      />
    </Layout>
  );
};

export default Tracking;
