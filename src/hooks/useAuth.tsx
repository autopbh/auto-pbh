
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

export const useAuth = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for session on mount
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        
        if (session) {
          await fetchProfile(session.user.id);
        }
      } catch (error: any) {
        console.error("Error getting session:", error.message);
      }
    };

    getInitialSession();

    // Set up auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session);
        setSession(session);
        
        if (session) {
          await fetchProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setProfile(null);
        }
      }
    );
    
    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        throw error;
      }
      
      if (data) {
        console.log("Profile data loaded:", data);
        setProfile(data);
      } else {
        console.log("No profile found for user", userId);
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error.message);
      toast({
        title: t("messages.error"),
        description: error.message || t("messages.profileLoadError"),
        variant: "destructive",
      });
    }
  };

  const handleSignUp = async (email: string, password: string, firstName: string, lastName: string, phone: string) => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/account`,
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data) {
        toast({
          title: t("messages.signupSuccess"),
          description: t("messages.signupSuccessDesc"),
        });
      }
    } catch (error: any) {
      console.error("Signup error:", error.message);
      toast({
        title: t("messages.signupError"),
        description: error.message || t("messages.signupError"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        toast({
          title: t("messages.loginSuccess"),
          description: t("messages.loginSuccessDesc"),
        });
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      toast({
        title: t("messages.loginError"),
        description: error.message || t("messages.loginErrorDesc"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut();
      toast({
        title: t("messages.signoutSuccess"),
        description: t("messages.signoutSuccessDesc"),
      });
      setSession(null);
      setProfile(null);
    } catch (error: any) {
      console.error("Signout error:", error.message);
      toast({
        title: t("messages.error"),
        description: error.message || t("messages.error"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (firstName: string, lastName: string, phone: string) => {
    setLoading(true);
    
    if (!session) {
      toast({
        title: t("messages.error"),
        description: t("messages.mustBeLoggedIn"),
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    try {
      // First, check if a profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();
        
      if (fetchError) throw fetchError;
      
      const updates = {
        id: session.user.id,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        updated_at: new Date().toISOString(),
      };
      
      let result;
      
      if (existingProfile) {
        // Update existing profile
        result = await supabase
          .from("profiles")
          .update(updates)
          .eq("id", session.user.id);
      } else {
        // Insert new profile
        result = await supabase
          .from("profiles")
          .insert(updates);
      }
      
      if (result.error) throw result.error;
      
      toast({
        title: t("messages.profileUpdated"),
        description: t("messages.profileUpdatedDesc"),
      });
      
      // Refetch the profile to update the local state
      await fetchProfile(session.user.id);
    } catch (error: any) {
      console.error("Profile update error:", error.message);
      toast({
        title: t("messages.error"),
        description: error.message || t("messages.profileUpdateError"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    session,
    profile,
    handleSignUp,
    handleSignIn,
    handleSignOut,
    updateProfile,
  };
};
