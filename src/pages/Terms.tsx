
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-8">Conditions Générales de Service</h1>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm mb-8">
            <h2 className="text-2xl font-semibold mb-6 text-autop-red">Version Abrégée</h2>
            
            <div className="space-y-6 mb-8">
              <p className="text-lg">
                Les points clés de nos conditions générales de service que vous devez connaître :
              </p>
              
              <ul className="space-y-4 list-disc pl-5">
                <li>
                  <span className="font-medium">Délai de rétractation :</span> 14 jours à compter de la livraison du véhicule
                </li>
                <li>
                  <span className="font-medium">Juridiction :</span> Tribunal de Rotterdam, Pays-Bas
                </li>
                <li>
                  <span className="font-medium">Garanties légales :</span> Conformément aux directives européennes en vigueur
                </li>
                <li>
                  <span className="font-medium">Réservation :</span> Acompte de 10% non remboursable sauf défaut du véhicule
                </li>
                <li>
                  <span className="font-medium">Livraison :</span> Délais indicatifs, non contractuels
                </li>
                <li>
                  <span className="font-medium">Documents :</span> Carte grise et certificat de conformité fournis
                </li>
              </ul>
              
              <div className="text-center mt-8">
                <Button className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Lire la version complète
                </Button>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Articles Principaux</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Article 1 - Objet et Champ d'Application</h4>
                  <p className="text-muted-foreground">
                    Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre AUTO PBH, 
                    immatriculée au Registre du Commerce des Pays-Bas sous le numéro KVK 87654321, dont le siège social 
                    est situé Autolettestraat 10, 3063 NP Rotterdam (ci-après "le Vendeur") et toute personne physique ou morale 
                    procédant à l'achat d'un véhicule (ci-après "l'Acheteur").
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Article 2 - Commandes et Réservation</h4>
                  <p className="text-muted-foreground">
                    La réservation d'un véhicule n'est définitive qu'après versement d'un acompte représentant 10% 
                    du prix total du véhicule. Cet acompte est non remboursable en cas d'annulation par l'Acheteur, 
                    sauf si le véhicule présente un défaut non mentionné dans la description ou si le délai de 
                    livraison contractuel est dépassé de plus de 30 jours.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Article 3 - Droit de Rétractation</h4>
                  <p className="text-muted-foreground">
                    Conformément à la directive européenne 2011/83/UE, l'Acheteur dispose d'un délai de 14 jours 
                    à compter de la livraison du véhicule pour exercer son droit de rétractation, sans avoir à 
                    justifier de motifs ni à payer de pénalités. Les frais de retour sont à la charge de l'Acheteur.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
