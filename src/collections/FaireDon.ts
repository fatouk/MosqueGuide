import { Mosquee } from "./Mosquee";
import { Utilisateur } from "./Utilisateur";


export class FaireDon{
  _id!: string;
  montant!: number;
  date!: Date;
  utilisateur!: Utilisateur;
  mosquee!: Mosquee;
  moyen_payement!:EnumPaiement;
  constructor(){} 
}