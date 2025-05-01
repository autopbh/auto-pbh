
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  vehicle: string;
  date: string;
  avatar?: string;
  language?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Miguel Silva",
    location: "Lisbon, Portugal",
    rating: 5,
    comment: "O processo de compra com a AUTO PBH foi impecável. Encontrei um Mercedes Classe C em perfeito estado, e o serviço foi profissional do início ao fim. A entrega foi rápida e sem problemas até Lisboa.",
    vehicle: "Mercedes-Benz C-Class",
    date: "2023-10-15",
    language: "pt"
  },
  {
    id: "t2",
    name: "Sophie Dubois",
    location: "Brussels, Belgium",
    rating: 5,
    comment: "Je cherchais une BMW Série 5 depuis longtemps et AUTO PBH avait exactement ce que je voulais avec un kilométrage bas et un historique d'entretien complet. Le véhicule est arrivé à Bruxelles en parfait état et dans les délais annoncés.",
    vehicle: "BMW 5 Series",
    date: "2023-09-22",
    language: "fr"
  },
  {
    id: "t3",
    name: "Antonio Rossi",
    location: "Milan, Italy",
    rating: 4,
    comment: "Esperienza fantastica con AUTO PBH! Ho acquistato un'Audi A6 a un prezzo molto competitivo. Tutta la documentazione era perfettamente in ordine e l'auto corrispondeva esattamente alla descrizione. Consiglio vivamente.",
    vehicle: "Audi A6",
    date: "2023-11-05",
    language: "it"
  },
  {
    id: "t4",
    name: "Johanna Schmidt",
    location: "Munich, Germany",
    rating: 5,
    comment: "Finding a recent and well-maintained Porsche Macan is not easy, but AUTO PBH offered me an exceptional selection. The customer service was responsive to all my questions, and the car is impeccable.",
    vehicle: "Porsche Macan",
    date: "2023-08-17",
    language: "en"
  },
  {
    id: "t5",
    name: "Carlos Ferreira",
    location: "Porto, Portugal",
    rating: 5,
    comment: "He importado un Range Rover Sport a través de AUTO PBH y no podría estar más satisfecho. El sistema de seguimiento de entrega fue muy conveniente y el vehículo es exactamente como se muestra en las fotos. ¡Servicio de primera clase!",
    vehicle: "Range Rover Sport",
    date: "2023-12-03",
    language: "es"
  }
];
