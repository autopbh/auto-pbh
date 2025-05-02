
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

export const vehicles: Vehicle[] = [
  renaultMegane, // Ajout de la nouvelle Renault Megane en tête de liste
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
