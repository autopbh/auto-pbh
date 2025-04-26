
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 dark:bg-autop-dark px-4">
        <div className="text-center max-w-lg">
          <h1 className="text-6xl font-bold text-autop-red mb-6">404</h1>
          <h2 className="text-2xl font-bold mb-4">Page non trouvée</h2>
          <p className="text-muted-foreground mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link to="/">
            <Button className="btn-primary">Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
