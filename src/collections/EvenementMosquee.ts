import { Mosquee } from "./Mosquee";
import { Utilisateur } from "./Utilisateur";

class EvenementMosquee {
    _id!: string;
    type_evenement!: EnumEvent;
    date_evenement!: Date;
    description_evenement!: string;
    mosquee!:Mosquee
    utilisateur!:Utilisateur
    constructor(){}
    
  }