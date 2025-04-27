
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60 z-10" />
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2566&auto=format&fit=crop"
          alt="Luxury car showroom"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Découvrez l'Excellence Automobile
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Notre équipe d'experts est à votre disposition pour vous accompagner dans 
            la sélection du véhicule qui correspondra parfaitement à vos exigences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/catalog">
              <Button className="btn-primary text-lg px-8 py-6">
                Explorer Notre Collection
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                Contact Privilégié
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
