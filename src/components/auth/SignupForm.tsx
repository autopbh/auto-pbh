import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface SignupFormProps {
  onSignup: (email: string, password: string, firstName: string, lastName: string, phone: string) => Promise<void>;
  loading: boolean;
}

const SignupForm = ({ onSignup, loading }: SignupFormProps) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSignup(email, password, firstName, lastName, phone);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-sm font-medium">
            {t("account.firstName")}
          </label>
          <Input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={t("account.firstName")}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-sm font-medium">
            {t("account.lastName")}
          </label>
          <Input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder={t("account.lastName")}
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="signupEmail" className="block text-sm font-medium">
          {t("account.email")}
        </label>
        <Input
          id="signupEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("account.emailPlaceholder")}
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="signupPassword" className="block text-sm font-medium">
          {t("account.password")}
        </label>
        <Input
          id="signupPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("account.passwordPlaceholder")}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          {t("account.passwordRequirement")}
        </p>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-medium">
          {t("account.phone")}
        </label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t("account.phonePlaceholder")}
        />
      </div>
      
      <Button
        type="submit"
        className="w-full"
        disabled={loading}
      >
        {loading ? t("account.loading") : t("account.signupButton")}
      </Button>
    </form>
  );
};

export default SignupForm;