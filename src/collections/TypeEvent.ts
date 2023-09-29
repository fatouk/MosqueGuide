import { Utilisateur } from "./Utilisateur";

export class TypeEvent{
    _id!:string;
    nom!:string;
    description!:string;
    etat!:string;
    utilisateur!:Utilisateur;
    constructor(){}
}