
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Clock, PhoneCall, Car, Wrench, CheckCircle, Award, Zap, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Warranty = () => {
  const { t } = useLanguage();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">{t("warranty.title")}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("warranty.subtitle")}
            </p>
          </div>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-16">
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-6 text-autop-red border-b border-autop-red/20 pb-2">
                {t("warranty.excellenceCommitment")}
              </h2>
              <div className="grid md:grid-cols-2 gap-8 mb-6">
                <div>
                  <p className="text-lg mb-4">
                    {t("warranty.commitment.paragraph1")}
                  </p>
                  <p className="text-lg mb-4">
                    {t("warranty.commitment.paragraph2")}
                  </p>
                  <p className="text-lg">
                    {t("warranty.commitment.paragraph3")}
                  </p>
                </div>
                
                <div className="bg-gradient-to-br from-autop-red/5 to-autop-red/10 p-6 rounded-lg flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <Shield className="h-12 w-12 text-autop-red" />
                    <div>
                      <h3 className="text-xl font-semibold">{t("warranty.integralProtection")}</h3>
                      <p className="text-muted-foreground">{t("warranty.mostComprehensiveProgram")}</p>
                    </div>
                  </div>
                  <ul className="space-y-3 pl-4">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-autop-red shrink-0" />
                      <span>{t("warranty.extendedCoverage")}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-autop-red shrink-0" />
                      <span>{t("warranty.premiumRoadside")}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-autop-red shrink-0" />
                      <span>{t("warranty.preferentialMaintenance")}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-autop-red shrink-0" />
                      <span>{t("warranty.transferableWarranty")}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-8 text-autop-red border-b border-autop-red/20 pb-2">
                {t("warranty.detailedCoverage")}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <Card className="overflow-hidden border-autop-red/20">
                  <div className="bg-autop-red text-white p-4">
                    <div className="flex items-center gap-3">
                      <Shield className="h-6 w-6" />
                      <h3 className="text-xl font-medium">{t("warranty.mechanicalTransmissionWarranty")}</h3>
                    </div>
                    <p className="mt-2 text-white/80 text-sm">{t("warranty.mechanicalTransmissionDescription")}</p>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-autop-red/10 rounded-full p-2">
                          <Clock className="h-5 w-5 text-autop-red" />
                        </div>
                        <div>
                          <p className="font-medium">{t("warranty.standardDuration")}</p>
                          <p className="text-2xl font-bold text-autop-red">24 {t("warranty.months")}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-sm bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium">{t("warranty.extensionPossible")}</p>
                          <p>{t("warranty.upTo36Months")}</p>
                        </div>
                        <div className="text-sm bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium">{t("warranty.mileage")}</p>
                          <p>{t("warranty.unlimited")}</p>
                        </div>
                      </div>
                      
                      <div className="pt-3">
                        <h4 className="font-medium mb-2 border-l-4 border-autop-red pl-2">{t("warranty.coveredComponents")}:</h4>
                        <ul className="space-y-1 text-muted-foreground pl-4 list-disc">
                          <li>{t("warranty.engineBlock")}</li>
                          <li>{t("warranty.cylinderHead")}</li>
                          <li>{t("warranty.transmissionBox")}</li>
                          <li>{t("warranty.oilPumps")}</li>
                          <li>{t("warranty.driveShafts")}</li>
                          <li>{t("warranty.fuelCircuits")}</li>
                          <li>{t("warranty.turbochargers")}</li>
                          <li>{t("warranty.flywheel")}</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden border-autop-red/20">
                  <div className="bg-autop-red text-white p-4">
                    <div className="flex items-center gap-3">
                      <Zap className="h-6 w-6" />
                      <h3 className="text-xl font-medium">{t("warranty.electronicWarranty")}</h3>
                    </div>
                    <p className="mt-2 text-white/80 text-sm">{t("warranty.electronicWarrantyDescription")}</p>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-autop-red/10 rounded-full p-2">
                          <Clock className="h-5 w-5 text-autop-red" />
                        </div>
                        <div>
                          <p className="font-medium">{t("warranty.standardDuration")}</p>
                          <p className="text-2xl font-bold text-autop-red">12 {t("warranty.months")}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-sm bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium">{t("warranty.extensionPossible")}</p>
                          <p>{t("warranty.upTo24Months")}</p>
                        </div>
                        <div className="text-sm bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium">{t("warranty.updates")}</p>
                          <p>{t("warranty.included")}</p>
                        </div>
                      </div>
                      
                      <div className="pt-3">
                        <h4 className="font-medium mb-2 border-l-4 border-autop-red pl-2">{t("warranty.coveredSystems")}:</h4>
                        <ul className="space-y-1 text-muted-foreground pl-4 list-disc">
                          <li>{t("warranty.infotainmentSystems")}</li>
                          <li>{t("warranty.digitalDashboards")}</li>
                          <li>{t("warranty.drivingAidSystems")}</li>
                          <li>{t("warranty.sensorsAndCameras")}</li>
                          <li>{t("warranty.connectivitySystems")}</li>
                          <li>{t("warranty.electronicUnits")}</li>
                          <li>{t("warranty.climateControl")}</li>
                          <li>{t("warranty.premiumAudio")}</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white shadow-sm rounded-lg p-6 text-center border border-autop-red/10">
                  <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                    <PhoneCall className="h-8 w-8 text-autop-red" />
                  </div>
                  <h3 className="text-lg font-medium mb-3">{t("warranty.support24h")}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <p>{t("warranty.support24hDescription1")}</p>
                    <p>{t("warranty.support24hDescription2")}</p>
                    <p>{t("warranty.support24hDescription3")}</p>
                  </div>
                  <div className="text-sm font-medium text-autop-red">
                    {t("warranty.support24hResponseTime")}
                  </div>
                </div>
                
                <div className="bg-white shadow-sm rounded-lg p-6 text-center border border-autop-red/10">
                  <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                    <Car className="h-8 w-8 text-autop-red" />
                  </div>
                  <h3 className="text-lg font-medium mb-3">{t("warranty.replacementVehicle")}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <p>{t("warranty.replacementVehicleDescription1")}</p>
                    <p>{t("warranty.replacementVehicleDescription2")}</p>
                    <p>{t("warranty.replacementVehicleDescription3")}</p>
                  </div>
                  <div className="text-sm font-medium text-autop-red">
                    {t("warranty.replacementVehicleTime")}
                  </div>
                </div>
                
                <div className="bg-white shadow-sm rounded-lg p-6 text-center border border-autop-red/10">
                  <div className="bg-autop-red/10 h-16 w-16 flex items-center justify-center rounded-full mx-auto mb-4">
                    <Wrench className="h-8 w-8 text-autop-red" />
                  </div>
                  <h3 className="text-lg font-medium mb-3">{t("warranty.privilegedMaintenance")}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <p>{t("warranty.privilegedMaintenanceDescription1")}</p>
                    <p>{t("warranty.privilegedMaintenanceDescription2")}</p>
                    <p>{t("warranty.privilegedMaintenanceDescription3")}</p>
                  </div>
                  <div className="text-sm font-medium text-autop-red">
                    {t("warranty.privilegedMaintenanceTime")}
                  </div>
                </div>
              </div>
              
              <div className="bg-autop-red/5 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="h-5 w-5 text-autop-red" />
                  <h3 className="text-xl font-semibold">{t("warranty.note")}</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  {t("warranty.noteDescription")}
                </p>
                <ul className="space-y-2 text-muted-foreground pl-4 list-disc">
                  <li>{t("warranty.noteItem1")}</li>
                  <li>{t("warranty.noteItem2")}</li>
                  <li>{t("warranty.noteItem3")}</li>
                  <li>{t("warranty.noteItem4")}</li>
                </ul>
              </div>
            </div>
            
            <div className="mb-10">
              <h2 className="text-2xl font-semibold mb-6 text-autop-red border-b border-autop-red/20 pb-2">
                {t("warranty.warrantyPrograms")}
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-autop-red/10">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">{t("warranty.standard")}</h3>
                      <p className="text-muted-foreground text-sm">{t("warranty.standardDescription")}</p>
                      <div className="flex items-baseline mt-4 mb-2">
                        <span className="text-3xl font-bold">24</span>
                        <span className="text-lg ml-1">{t("warranty.months")}</span>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>{t("warranty.completeMechanicalWarranty")}</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>{t("warranty.12MonthsElectronics")}</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>{t("warranty.basicRoadsideAssistance")}</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>{t("warranty.replacementVehicle7Days")}</span>
                      </li>
                    </ul>
                    <div>
                      <p className="text-center text-muted-foreground text-sm">{t("warranty.includedNoExtraCost")}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-autop-red relative z-10 transform scale-105 shadow-lg">
                  <div className="absolute -top-4 inset-x-0 flex justify-center">
                    <span className="bg-autop-red text-white text-sm font-medium px-4 py-1 rounded-full">
                      {t("warranty.recommended")}
                    </span>
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">{t("warranty.premium")}</h3>
                      <p className="text-muted-foreground text-sm">{t("warranty.premiumDescription")}</p>
                      <div className="flex items-baseline mt-4 mb-2">
                        <span className="text-3xl font-bold">30</span>
                        <span className="text-lg ml-1">{t("warranty.months")}</span>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>{t("warranty.extendedMechanicalWarranty")}</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>{t("warranty.24MonthsElectronics")}</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>{t("warranty.premiumRoadsideAssistance")}</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>{t("warranty.unlimitedReplacementVehicle")}</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>{t("warranty.twoCompleteServices")}</span>
                      </li>
                    </ul>
                    <div className="text-center">
                      <Button className="w-full bg-autop-red hover:bg-autop-red/90 text-white">
                        {t("warranty.select")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-autop-red/10">
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-1">{t("warranty.excellence")}</h3>
                      <p className="text-muted-foreground text-sm">{t("warranty.excellenceDescription")}</p>
                      <div className="flex items-baseline mt-4 mb-2">
                        <span className="text-3xl font-bold">36</span>
                        <span className="text-lg ml-1">{t("warranty.months")}</span>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>{t("warranty.completeMechanicalWarranty")}</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>{t("warranty.24MonthsElectronics")}</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>{t("warranty.vipAssistance")}</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>{t("warranty.premiumReplacementVehicle")}</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>{t("warranty.allServicesIncluded")}</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-autop-red mr-2 shrink-0" />
                        <span>{t("warranty.dedicatedConcierge")}</span>
                      </li>
                    </ul>
                    <div className="text-center">
                      <Button variant="outline" className="w-full border-autop-red text-autop-red hover:bg-autop-red/10">
                        {t("warranty.select")}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="border-t pt-8 text-center">
              <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
                {t("warranty.finalQuote")}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="bg-autop-red text-white hover:bg-autop-red/90">
                  {t("warranty.downloadContract")}
                </Button>
                <Link to="/contact">
                  <Button variant="outline" className="border-autop-red text-autop-red hover:bg-autop-red/10">
                    {t("warranty.contactAdvisor")}
                  </Button>
                </Link>
              </div>
            </div>
          </section>
          
          <section className="bg-gradient-to-br from-autop-red to-autop-red/80 text-white p-8 rounded-lg text-center">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <Award className="h-12 w-12 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-2">{t("warranty.ourPromise")}</h2>
                <p className="text-lg opacity-90">
                  {t("warranty.ourPromiseDescription")}
                </p>
              </div>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  {t("warranty.discussWithExpert")}
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Warranty;
