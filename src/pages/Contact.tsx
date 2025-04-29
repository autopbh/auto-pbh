
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, Mail, MapPin, Clock, Calendar, MessageSquare } from "lucide-react";

const Contact = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Contact Privilégié</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions
              et vous accompagner dans votre projet automobile.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            <div>
              <Card className="h-full bg-white/70">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6 text-autop-red border-b border-autop-red/20 pb-2">
                    Contactez-Nous
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-autop-red rounded-full p-3 shrink-0">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Adresse</h3>
                        <p className="text-muted-foreground">AUTO PBH</p>
                        <p className="text-muted-foreground">Autolettestraat 10</p>
                        <p className="text-muted-foreground">3063 NP Rotterdam</p>
                        <p className="text-muted-foreground">Pays-Bas</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-autop-red rounded-full p-3 shrink-0">
                        <PhoneCall className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Téléphone</h3>
                        <p className="text-lg text-autop-red font-medium">+351 961 196 405</p>
                        <p className="text-sm text-muted-foreground">
                          Service client disponible 7j/7 de 8h à 22h
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-autop-red rounded-full p-3 shrink-0">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Email</h3>
                        <p className="text-lg">pbhauto@gmail.com</p>
                        <p className="text-sm text-muted-foreground">
                          Réponse garantie sous 2 heures durant nos horaires d'ouverture
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-autop-red rounded-full p-3 shrink-0">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Horaires d'Ouverture</h3>
                        <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                          <p>Lundi - Vendredi:</p>
                          <p>9h - 19h</p>
                          <p>Samedi:</p>
                          <p>10h - 18h</p>
                          <p>Dimanche:</p>
                          <p>Sur rendez-vous</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="h-full bg-white/70">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6 text-autop-red border-b border-autop-red/20 pb-2">
                    Service Premium
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-autop-red/10 to-transparent p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2 flex items-center">
                        <Calendar className="h-5 w-5 text-autop-red mr-2" />
                        Rendez-vous Personnalisé
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Nos experts vous accueillent dans notre showroom sur rendez-vous, à l'heure qui vous convient, 
                        même en dehors des horaires d'ouverture standards.
                      </p>
                      <Button className="w-full bg-autop-red hover:bg-autop-red/90 text-white">
                        Prendre Rendez-vous
                      </Button>
                    </div>
                    
                    <div className="bg-gradient-to-r from-autop-red/10 to-transparent p-4 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2 flex items-center">
                        <MessageSquare className="h-5 w-5 text-autop-red mr-2" />
                        Consultation Vidéo
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Ne pouvez-vous pas vous déplacer ? Optez pour une consultation vidéo avec présentation 
                        détaillée du véhicule qui vous intéresse par l'un de nos spécialistes.
                      </p>
                      <Button className="w-full bg-autop-red hover:bg-autop-red/90 text-white">
                        Demander une Consultation
                      </Button>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Nos Conseillers Experts</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-autop-red/10">
                          <p className="font-medium">Paulo Henriques</p>
                          <p className="text-sm text-muted-foreground">Directeur & Expert Véhicules de Collection</p>
                          <p className="text-sm text-autop-red mt-2">Langues: FR, PT, EN, ES</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-autop-red/10">
                          <p className="font-medium">Marie Dubois</p>
                          <p className="text-sm text-muted-foreground">Responsable Service Client Premium</p>
                          <p className="text-sm text-autop-red mt-2">Langues: FR, EN, DE</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">Comment Nous Trouver</h2>
            <div className="rounded-lg overflow-hidden shadow-lg h-[400px] border-4 border-white">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2460.5935633350313!2d4.535982899999999!3d51.926462799999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c433453c2c9ad9%3A0x27e6f2d7b519b80e!2sAutolettestraat%2010%2C%203063%20NP%20Rotterdam%2C%20Netherlands!5e0!3m2!1sen!2sus!4v1703870509609!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AUTO PBH Location"
              ></iframe>
            </div>
          </section>
          
          <section className="bg-white/50 backdrop-blur-sm p-8 rounded-lg shadow-sm text-center">
            <h2 className="text-2xl font-semibold mb-4">Assistance 24/7</h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              En cas d'urgence, notre équipe d'assistance technique est disponible 24h/24 et 7j/7 
              pour vous accompagner dans toute l'Europe.
            </p>
            <div className="flex justify-center">
              <Button size="lg" className="bg-autop-red hover:bg-autop-red/90 text-white">
                <PhoneCall className="h-5 w-5 mr-2" />
                Contacter l'Assistance
              </Button>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
