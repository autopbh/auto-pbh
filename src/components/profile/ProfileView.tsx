
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import AccountTabs from "./AccountTabs";

interface ProfileViewProps {
  profile: any;
  session: any;
  loading: boolean;
  onSignOut: () => Promise<void>;
  onUpdateProfile: (firstName: string, lastName: string, phone: string) => Promise<void>;
}

const ProfileView = ({ 
  profile,
  session,
  loading,
  onSignOut,
  onUpdateProfile
}: ProfileViewProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleUpdateProfile = async (firstName: string, lastName: string, phone: string) => {
    await onUpdateProfile(firstName, lastName, phone);
    // No need to do anything else as toast is now handled in the useAuth hook
  };

  return (
    <div className="container mx-auto px-4 py-16 mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold">{t("auth.myAccount")}</h1>
          <Button
            variant="outline"
            onClick={onSignOut}
            disabled={loading}
          >
            {loading ? t("messages.loading") : t("auth.signout")}
          </Button>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
          {session && (
            <AccountTabs 
              profile={profile}
              session={session}
              loading={loading}
              onUpdateProfile={handleUpdateProfile}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
