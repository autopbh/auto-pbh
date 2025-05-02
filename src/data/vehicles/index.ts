
import { Vehicle } from "../../types";
import { miniCountryman } from "./mini-countryman";
import { mercedesCla } from "./mercedes-cla";
import { audiQ3 } from "./audi-q3";
import { fordF150 } from "./ford-f150";
import { porscheMacan } from "./porsche-macan";
import { fordTerritory } from "./ford-territory";
import { jaguarEPace } from "./jaguar-epace";
import { bmw320i } from "./bmw-320i";
import { rangeRoverEvoque } from "./range-rover-evoque";
import { volkswagenTCross } from "./volkswagen-tcross";
import { toyotaCorolla } from "./toyota-corolla";
import { renaultMegane } from "./renault-megane";
import { renaultClioRS } from "./renault-clio-rs";
import { peugeot208 } from "./peugeot-208";

export const vehicles: Vehicle[] = [
  peugeot208, // Ajout de la nouvelle Peugeot 208 en tête de liste
  renaultClioRS,
  renaultMegane,
  miniCountryman,
  mercedesCla,
  audiQ3,
  fordF150,
  porscheMacan,
  fordTerritory,
  jaguarEPace,
  bmw320i,
  rangeRoverEvoque,
  volkswagenTCross,
  toyotaCorolla
];
