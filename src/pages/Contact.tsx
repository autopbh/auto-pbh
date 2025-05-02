
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, Mail, MapPin, Clock, Calendar, MessageSquare, Send, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/sonner";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formspreeId, setFormspreeId] = useState(""); // Placeholder for Formspree ID
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Replace with your Formspree form ID
    // Example: setFormspreeId("xyyzbba");
    setFormspreeId("xrgwkpql");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const form = e.currentTarget;
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
        toast.success("Message envoyé avec succès!");
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error("Problème lors de l'envoi du formulaire");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Erreur lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
                    Formulaire de Contact
                  </h2>
                  
                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">Nom</label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="Votre nom" 
                          required 
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          placeholder="votre@email.com" 
                          required 
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">Téléphone</label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          placeholder="+33 6 12 34 56 78" 
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-1">Sujet</label>
                        <Input 
                          id="subject" 
                          name="subject" 
                          placeholder="Sujet de votre message" 
                          required 
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                        <Textarea 
                          id="message" 
                          name="message" 
                          placeholder="Votre message..." 
                          className="min-h-[120px]" 
                          required 
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-autop-red hover:bg-autop-red/90 text-white"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <span className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-white rounded-full"></span>
                            Envoi en cours...
                          </span>
                        ) : (
                          <span className="flex items-center">
                            <Send className="h-4 w-4 mr-2" />
                            Envoyer le message
                          </span>
                        )}
                      </Button>
                      
                      <p className="text-xs text-muted-foreground mt-2">
                        Vos données personnelles sont protégées conformément à notre politique de confidentialité.
                      </p>
                    </form>
                  ) : (
                    <div className="text-center py-10">
                      <div className="bg-green-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Merci pour votre message!</h3>
                      <p className="text-muted-foreground">
                        Nous avons bien reçu votre demande et nous vous répondrons dans les plus brefs délais.
                      </p>
                    </div>
                  )}
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
