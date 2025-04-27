
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";

const Contact = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">Contact</h1>
        <p className="text-lg mb-8">
          AUTO PBH - Autolettestraat 10, 3063 NP Rotterdam
        </p>
        <p className="text-lg text-autop-red mb-8">+351 961 196 405</p>
        <p className="text-lg mb-8">pbhauto@gmail.com</p>
      </div>
    </Layout>
  );
};

export default Contact;
