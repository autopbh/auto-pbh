import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

interface AuthTabsProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onSignup: (email: string, password: string, firstName: string, lastName: string, phone: string) => Promise<void>;
  loading: boolean;
}

const AuthTabs = ({ onLogin, onSignup, loading }: AuthTabsProps) => {
  const { t } = useLanguage();

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="login">{t("account.login")}</TabsTrigger>
        <TabsTrigger value="signup">{t("account.signup")}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="login">
        <LoginForm onLogin={onLogin} loading={loading} />
      </TabsContent>
      
      <TabsContent value="signup">
        <SignupForm onSignup={onSignup} loading={loading} />
      </TabsContent>
    </Tabs>
  );
};

export default AuthTabs;