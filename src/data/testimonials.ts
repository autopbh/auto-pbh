
export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  vehicle: string;
  date: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Miguel Silva",
    location: "Lisbon, Portugal",
    rating: 5,
    comment: "Le processus d'achat avec AUTO PBH a été impeccable. J'ai trouvé une Mercedes C-Class dans un état parfait, et le service était professionnel du début à la fin. La livraison a été rapide et sans problème jusqu'à Lisbonne.",
    vehicle: "Mercedes-Benz C-Class",
    date: "2023-10-15"
  },
  {
    id: "t2",
    name: "Sophie Dubois",
    location: "Brussels, Belgium",
    rating: 5,
    comment: "Je cherchais une BMW Série 5 depuis longtemps et AUTO PBH avait exactement ce que je voulais avec un kilométrage bas et un historique d'entretien complet. Le véhicule est arrivé à Bruxelles en parfait état et dans les délais annoncés.",
    vehicle: "BMW 5 Series",
    date: "2023-09-22"
  },
  {
    id: "t3",
    name: "Antonio Rossi",
    location: "Milan, Italy",
    rating: 4,
    comment: "Super expérience avec AUTO PBH! J'ai acheté une Audi A6 à un prix très compétitif. Toute la documentation était parfaitement en ordre et la voiture correspondait exactement à la description. Je recommande vivement.",
    vehicle: "Audi A6",
    date: "2023-11-05"
  },
  {
    id: "t4",
    name: "Johanna Schmidt",
    location: "Munich, Germany",
    rating: 5,
    comment: "Trouver une Porsche Macan récente et bien entretenue n'est pas facile, mais AUTO PBH m'a proposé un choix exceptionnel. Le service client a été réactif à toutes mes questions et la voiture est impeccable.",
    vehicle: "Porsche Macan",
    date: "2023-08-17"
  },
  {
    id: "t5",
    name: "Carlos Ferreira",
    location: "Porto, Portugal",
    rating: 5,
    comment: "J'ai importé une Range Rover Sport via AUTO PBH et je ne pourrais pas être plus satisfait. Le système de suivi de livraison était très pratique et le véhicule est exactement comme sur les photos. Service de première classe!",
    vehicle: "Range Rover Sport",
    date: "2023-12-03"
  }
];
