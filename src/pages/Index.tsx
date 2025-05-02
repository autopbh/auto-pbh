
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import Testimonials from "@/components/home/Testimonials";
import Advantages from "@/components/home/Advantages";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  // Scroll to top on page load with error handling
  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Failed to scroll to top:", error);
    }
  }, []);

  return (
    <Layout>
      <main>
        <HeroSection />
        <FeaturedVehicles />
        <Advantages />
        <Testimonials />
        <CallToAction />
      </main>
    </Layout>
  );
};

export default Index;
