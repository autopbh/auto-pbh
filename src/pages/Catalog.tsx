
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";

const Catalog = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">Catalogue</h1>
        <p className="text-lg mb-8">
          Notre catalogue de véhicules sera bientôt disponible.
        </p>
      </div>
    </Layout>
  );
};

export default Catalog;
