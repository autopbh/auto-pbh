
import { Shield, Truck, Check } from "lucide-react";

const Advantages = () => {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-autop-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Pourquoi choisir AUTO PBH
        </h2>
        <p className="text-muted-foreground text-center max-w-3xl mx-auto mb-16">
          Notre engagement est de vous offrir une expérience d'achat automobile exceptionnelle, 
          avec des véhicules de qualité et un service personnalisé.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quality */}
          <div className="bg-white dark:bg-autop-gray rounded-lg shadow-md p-8 text-center transition-transform hover:-translate-y-2 duration-300 group">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-autop-red/10 mb-6 group-hover:bg-autop-red/20">
              <Check className="h-8 w-8 text-autop-red" />
            </div>
            <h3 className="text-xl font-bold mb-4">Sélection rigoureuse</h3>
            <p className="text-muted-foreground">
              Tous nos véhicules sont soigneusement sélectionnés et inspectés pour garantir 
              leur qualité exceptionnelle et leur état impeccable.
            </p>
          </div>
          
          {/* Warranty */}
          <div className="bg-white dark:bg-autop-gray rounded-lg shadow-md p-8 text-center transition-transform hover:-translate-y-2 duration-300 group">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-autop-red/10 mb-6 group-hover:bg-autop-red/20">
              <Shield className="h-8 w-8 text-autop-red" />
            </div>
            <h3 className="text-xl font-bold mb-4">Garantie étendue</h3>
            <p className="text-muted-foreground">
              Nous offrons des garanties étendues sur tous nos véhicules pour vous assurer 
              une tranquillité d'esprit complète après votre achat.
            </p>
          </div>
          
          {/* Delivery */}
          <div className="bg-white dark:bg-autop-gray rounded-lg shadow-md p-8 text-center transition-transform hover:-translate-y-2 duration-300 group">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-autop-red/10 mb-6 group-hover:bg-autop-red/20">
              <Truck className="h-8 w-8 text-autop-red" />
            </div>
            <h3 className="text-xl font-bold mb-4">Livraison européenne</h3>
            <p className="text-muted-foreground">
              Nous livrons votre véhicule partout en Europe avec un suivi en temps réel et 
              un service de transport professionnel et sécurisé.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
