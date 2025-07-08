
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import AuthTabs from "@/components/auth/AuthTabs";
import ProfileView from "@/components/profile/ProfileView";

const Account = () => {
  const { t } = useLanguage();
  const { 
    loading, 
    session, 
    profile, 
    handleSignUp, 
    handleSignIn, 
    handleSignOut,
    updateProfile
  } = useAuth();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  // If user is logged in, show profile page
  if (session) {
    return (
      <Layout>
        <ProfileView 
          profile={profile}
          session={session}
          loading={loading}
          onSignOut={handleSignOut}
          onUpdateProfile={updateProfile}
        />
      </Layout>
    );
  }

  // Authentication form (login/signup) when not logged in
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-md mx-auto bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-6">{t("account.title")}</h1>
          
          <AuthTabs 
            onLogin={handleSignIn}
            onSignup={handleSignUp}
            loading={loading}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Account;
