import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, firstValueFrom, isEmpty, lastValueFrom } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Mosquee } from 'src/collections/Mosquee';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { MosqueesService } from '../service/mosquees/mosquees.service';




@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  currentTime!: string;
  remainingTime!: string;
  items!: Observable<any[]>;
  private intervalId: any;
  //POUR CREER UN REALTIME OBJET
  mosq: AngularFireObject<any> | undefined;
  //POUR CREER UN Firestore Document
  evenement!: AngularFirestoreDocument<any>;
  documentRef: any;
  eventCollection: any;
  document$!: Observable<any>;
  document2$!: any;
  nom:string="";
  mosquee:Mosquee=new Mosquee();
  Listmosquee!:Mosquee[];

   constructor(private mosqueeServie:MosqueesService,private router: Router, private firestore: Firestore, private Fdata: AngularFireDatabase, private fires: AngularFirestore) {
    //******************REALTIME DATABASE********************
    // Fdata.list('mosquees/').push({
    //   nom:'mosquee5',
    //   fadjr:'5h10',
    //   Duhr:'12h30',
    //   Asr:'15h30',
    //   Maghreb:'18h50',
    //   Icha:'20h00'

    // });
   

    // db: AngularFireDatabase
    this.mosq = Fdata.object('mosquees');
    console.log("============", this.mosq?.valueChanges().forEach(val => console.log("rep============", val)));
    //RECUPERER LA LISTE REALTIME
    Fdata.object("mosquees").valueChanges().subscribe(rep => { });
    this.items = Fdata.list('mosquees').snapshotChanges();
    const EventRef = Fdata.list('evenements');
    // EventRef.push({ titre: 'preche', imam: 'Mahi' });


    // ************ DATABASE FIRESTORE***************  
    // Create/Update a document: recuperer un document en fonction de sa ref 
    // set() for destructive updates efface et recree avec la meme ref
    // EVENTRef.set({ title: 'zkoder Tutorial',imam:'KOITA'});
    //   fires.collection('mosquees').add({
    //     nom: "mosqueeé3",
    // });
     
   
    fires.collection('mosquees').valueChanges()
      .subscribe(response => {
        // console.log("new============",response);
      })
    const itemCollection = collection(firestore, 'mosquees');
    collectionData(itemCollection).subscribe(data => {
      // console.log("mosquees =", (data));

    });
    ;



    // this.updateTime();
    // // Mettre à jour l'heure toutes les secondes
    // this.intervalId = setInterval(() => {
    //   this.updateTime();
    // }, 1000);
    // Nos Fonctions
    this.updateRemainingTime();
    
    // this.findDocumentByAttrbue("");

    // Mettre à jour le temps restant toutes les secondes
    this.intervalId = setInterval(() => {
      this.updateRemainingTime();
    }, 1000);
  }

  updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}:${seconds}`;
  }

  updateRemainingTime() {
    const now = new Date();
    const targetHour = 14; // L'heure cible, dans cet exemple, 14h (2 PM)
    if (now.getHours() < targetHour) {
      // Si l'heure actuelle est avant 14h
      const hoursRemaining = targetHour - now.getHours() - 1;
      const minutesRemaining = 59 - now.getMinutes();
      const secondsRemaining = 59 - now.getSeconds();
      this.remainingTime = `-${hoursRemaining.toString().padStart(2, '0')}: ${minutesRemaining.toString().padStart(2, '0')}: ${secondsRemaining.toString().padStart(2, '0')}:`;
    } else {
      // Si l'heure actuelle est après 14h
      this.remainingTime = "Journée terminée";
    }
  }
 
  ngOnInit()  {
    // this.FindByRef("Zbx0Hqg1bl9v4lFAZFhN","mosquees");    
      setTimeout(() => {
        // console.log("doc nomAfficher ============",  this.nom);
        }, 5000); // Attendre 5 secondes avant d'appeler FindByRef
        
        // this.addAndReturnRef();
        // this.findDocumentByAttrbue("mosquees","imam","HAIDARA");
     
  }

  //LES METHODES
  redirigerVersAutrePage() {
    this.router.navigate(['/liste-mosquees']);
  }
  redirigerVersCoran(){
    this.router.navigate(['/liste-sourates']);
  }
 async FindByRef(documentId:string,collection:string){
  this.document2$ =  await firstValueFrom(this.mosqueeServie.getDocumentById(collection,documentId));
  const documentData: any = await (this.mosqueeServie.getDocumentById2(collection, documentId));
   this.nom = await documentData.nom; 
  //  this.nom = await this.document2$.nom;
    console.log("Document trouvé par ref ============",  documentData.nom);  
} 


 async addAndReturnRef(){
  this.mosquee.nom="Mosquee Banconi";
  this.mosquee.imam="HAIDARA";
  this.mosquee.adresse="COMMUNE II";
  this.mosquee.telephone="78689545";
  this.mosquee.lieuFemme=true;
  this.mosquee.latitude=21.23234444;
  this.mosquee.longitude=-9.4236589;
  this.mosquee.Fadjr="5h05";
  this.mosquee.Asr="12h30";
  this.mosquee.Duhr="15h30";
  this.mosquee.Maghreb="18h50";
  this.mosquee.Icha="20h00";
  this.mosquee.Jumah="13h00"; 
  this.mosquee.description="mosque très peuplée";
  this.documentRef = await (this.mosqueeServie.addMosqueesDocument(this.mosquee));
  console.log("Document save and return ref ==========:",  this.documentRef);
     
  }

 async findDocumentByAttrbue(collection:string,nomattr:string,valeurattr:string){
 // Utilisez la méthode "where" pour créer une requête basée sur l'attribut "email"
this.eventCollection= await this.mosqueeServie.FindDocByAttribueEqual2(collection,nomattr,valeurattr);
// Le document correspondant à l'imam recherché a été trouvé  
console.log('Document trouvé par where :',  this.eventCollection);


  }

  

}
