
import { Button } from "@/components/ui/button";
import ProfileForm from "./ProfileForm";
import { useToast } from "@/hooks/use-toast";

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

  const handleUpdateProfile = async (firstName: string, lastName: string, phone: string) => {
    await onUpdateProfile(firstName, lastName, phone);
    // No need to do anything else as toast is now handled in the useAuth hook
  };

  return (
    <div className="container mx-auto px-4 py-16 mt-20">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold">Mon Compte</h1>
          <Button
            variant="outline"
            onClick={onSignOut}
            disabled={loading}
          >
            {loading ? "Chargement..." : "Déconnexion"}
          </Button>
        </div>
        
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Informations personnelles</h2>
          
          {session && (
            <ProfileForm 
              profile={profile} 
              onUpdate={handleUpdateProfile} 
              loading={loading} 
              userEmail={session.user.email} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
