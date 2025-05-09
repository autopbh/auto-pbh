
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import FeaturedVehicles from "@/components/home/FeaturedVehicles";
import Testimonials from "@/components/home/Testimonials";
import Advantages from "@/components/home/Advantages";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
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
