import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import ProfileForm from "./ProfileForm";
import OrderHistory from "./OrderHistory";
import SavedVehicles from "./SavedVehicles";
import AddressBook from "./AddressBook";

interface AccountTabsProps {
  profile: any;
  session: any;
  loading: boolean;
  onUpdateProfile: (firstName: string, lastName: string, phone: string) => Promise<void>;
}

const AccountTabs = ({ profile, session, loading, onUpdateProfile }: AccountTabsProps) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("profile");
  
  const handleUpdateProfile = async (firstName: string, lastName: string, phone: string) => {
    await onUpdateProfile(firstName, lastName, phone);
  };

  return (
    <Tabs 
      defaultValue="profile" 
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid grid-cols-4 mb-6">
        <TabsTrigger value="profile">{t("account.profileTab")}</TabsTrigger>
        <TabsTrigger value="orders">{t("account.ordersTab")}</TabsTrigger>
        <TabsTrigger value="favorites">{t("account.favoritesTab")}</TabsTrigger>
        <TabsTrigger value="addresses">{t("account.addressesTab")}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="profile" className="space-y-4">
        <ProfileForm 
          profile={profile} 
          onUpdate={handleUpdateProfile} 
          loading={loading} 
          userEmail={session?.user?.email || ""} 
        />
      </TabsContent>
      
      <TabsContent value="orders">
        <OrderHistory userId={session?.user?.id || ""} />
      </TabsContent>
      
      <TabsContent value="favorites">
        <SavedVehicles userId={session?.user?.id || ""} />
      </TabsContent>
      
      <TabsContent value="addresses">
        <AddressBook profileId={session?.user?.id || ""} />
      </TabsContent>
    </Tabs>
  );
};

export default AccountTabs;