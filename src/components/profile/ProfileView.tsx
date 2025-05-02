
import { Button } from "@/components/ui/button";
import ProfileForm from "./ProfileForm";

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
              onUpdate={onUpdateProfile} 
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
