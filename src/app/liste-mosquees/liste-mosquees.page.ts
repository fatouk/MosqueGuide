import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Mosquee } from 'src/collections/Mosquee';
import { MosqueesService } from '../service/mosquees/mosquees.service';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AnimationController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-liste-mosquees',
  templateUrl: './liste-mosquees.page.html',
  styleUrls: ['./liste-mosquees.page.scss'],
})
export class ListeMosqueesPage implements OnInit {
  listemosqees!:Mosquee[];
  remainingTime!: string;
  priereTime: string="test";
  private intervalId: any;
  searchTerm: string = ''; // Terme de recherche
  @Output() filteredItems = new EventEmitter<any[]>();
  @ViewChild(IonContent) content!: IonContent;
  isModalOpen = false;
  mosqueeSelect!:Mosquee;
  enterAnimation:any;
  leaveAnimation:any;
  taillemiste:number=0;


  constructor(private animationCtrl: AnimationController,private mosqueeServie:MosqueesService,private router: Router,  private fires: AngularFirestore) {
   
     
   
    this.updateRemainingTime();    
    // Mettre à jour le temps restant toutes les secondes
    this.intervalId = setInterval(() => {
      this.updateRemainingTime();
    }, 1000);
   }

  ngOnInit() {
    this.getListAll();
    this.animationModal();  
  }

  updateRemainingTime() {
    const now = new Date();
    const targetHour = 20; // L'heure cible, dans cet exemple, 14h (2 PM)
    const fadHour = 5; // L'heure cible, dans cet exemple, 14h (2 PM)
    const DuhrHour = 14; // L'heure cible, dans cet exemple, 14h (2 PM)
    const AsrHour = 16; // L'heure cible, dans cet exemple, 14h (2 PM)
    const MagrebHour = 19; // L'heure cible, dans cet exemple, 14h (2 PM)
    const IchaHour = 20; // L'heure cible, dans cet exemple, 14h (2 PM)
    if (now.getHours() < targetHour) {
      // Si l'heure actuelle est avant 14h
      

      const hoursRemaining = targetHour - now.getHours() - 1;
      const minutesRemaining = 59 - now.getMinutes();
      const secondsRemaining = 59 - now.getSeconds();

      this.remainingTime = `-${hoursRemaining.toString().padStart(2, '0')}: ${minutesRemaining.toString().padStart(2, '0')}: ${secondsRemaining.toString().padStart(2, '0')}:`;
      if(now.getHours()>=1 && now.getHours()<6 ){
        if(now.getMinutes()<=30 ){
          this.priereTime="Fadjr"
            }
      }
      if(now.getHours()>=6 && now.getHours()<15 ){
      if(now.getMinutes()<=59 ){
        this.priereTime="Duhr"
          }
    }
    if(now.getHours()>=15 && now.getHours()<17 ){
      if(now.getMinutes()<=59 ){
        this.priereTime="Asr"
          }
    }
    if(now.getHours()>=17 && now.getHours()<20 && now.getMinutes()<=55){
     
        this.priereTime="Maghreb"
          
    }
    if(now.getHours()>=20 && now.getHours()<24 && now.getMinutes()<=55){
     
      this.priereTime="Icha"
        
  }
    } else {
      // Si l'heure actuelle est après 14h
      this.remainingTime = "Journée terminée";
    }
  }

  async getListAll(){
    this.listemosqees= await this.mosqueeServie.getAllMosquees();
    this.taillemiste=this.listemosqees.length;
    console.log("taille=================",this.taillemiste);
    console.log("ma liste dans tsssss=====",this.listemosqees[4])

  }
  async handleInput(event:any) {
    const query = event.target.value.toLowerCase();
      if(event.target.value!=""){
      if (this.listemosqees !== undefined) {
        // Appeler toLowerCase() ici
        this.listemosqees =await this.listemosqees.filter((d) => d.nom.toLowerCase().indexOf(query) > -1);
    } 
    }else{
      this.listemosqees =await this.mosqueeServie.getAllMosquees();
      
    }
  }

  updateItemList(filteredItems: any[]) {
    this.listemosqees = filteredItems;
  }
  

  filterItems() {
    if(this.searchTerm!=""){
      this.listemosqees = this.listemosqees.filter(item => item.nom.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  }


  scrollToBottom() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the bottom instead of instantly
    this.content.scrollToBottom(500);
  }

  scrollToTop() {
    // Passing a duration to the method makes it so the scroll slowly
    // goes to the top instead of instantly
    this.content.scrollToTop(500);
  }
  

  setOpen(isOpen: boolean, item:Mosquee) {
    this.isModalOpen = isOpen;
    this.mosqueeSelect=item;
    console.log("=========mos",item)
  }
  closeOpen(isOpen: boolean){
    this.isModalOpen = isOpen;
  }

  animationModal(){
    this.enterAnimation = (baseEl: HTMLElement) => {
      const root = baseEl.shadowRoot;
  
      const backdropAnimation = this.animationCtrl
        .create()
        .addElement(root!.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');
  
      const wrapperAnimation = this.animationCtrl
        .create()
        .addElement(root!.querySelector('.modal-wrapper')!)
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' },
        ]);
  
      return this.animationCtrl
        .create()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };
  
    this.leaveAnimation = (baseEl: HTMLElement) => {
      return this.enterAnimation(baseEl).direction('reverse');
    };
  }
}
