
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">Détails du véhicule</h1>
        <p className="text-lg mb-8">
          Les détails du véhicule ID: {id} seront bientôt disponibles.
        </p>
        <Link to="/catalog">
          <Button className="btn-primary">Retour au catalogue</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default VehicleDetail;
