import { Mosquee } from "./Mosquee";

export class ConditionDon{
_id!:string;
titre!:string;
type!:EnumDonType;
description!:string;
mosquee!:Mosquee
moyen_paiement!:EnumPaiement[]
constructor(){}
}