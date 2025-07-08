
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useAuth = () => {
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
        title: "Erreur",
        description: error.message || "Erreur lors du chargement du profil",
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
          title: "Inscription réussie",
          description: "Veuillez vérifier votre email pour confirmer votre compte.",
        });
      }
    } catch (error: any) {
      console.error("Signup error:", error.message);
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur s'est produite lors de l'inscription",
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
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté",
        });
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      toast({
        title: "Erreur de connexion",
        description: error.message || "Email ou mot de passe incorrect",
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
        title: "Déconnexion réussie",
        description: "Vous êtes maintenant déconnecté",
      });
      setSession(null);
      setProfile(null);
    } catch (error: any) {
      console.error("Signout error:", error.message);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors de la déconnexion",
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
        title: "Erreur",
        description: "Vous devez être connecté pour mettre à jour votre profil",
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
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès",
      });
      
      // Refetch the profile to update the local state
      await fetchProfile(session.user.id);
    } catch (error: any) {
      console.error("Profile update error:", error.message);
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de la mise à jour du profil",
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
