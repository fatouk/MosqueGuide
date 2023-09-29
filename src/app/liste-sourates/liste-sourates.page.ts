import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CoranService } from '../service/coran/coran.service';
import { Sourate } from 'src/collections/Sourate';
import { AnimationController, IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-liste-sourates',
  templateUrl: './liste-sourates.page.html',
  styleUrls: ['./liste-sourates.page.scss'],
})
export class ListeSouratesPage implements OnInit {

  listesourates!:Sourate[];
  remainingTime!: string;
  priereTime: string="test";
  private intervalId: any;
  searchTerm: string = ''; // Terme de recherche
  @Output() filteredItems = new EventEmitter<any[]>();
  @ViewChild(IonContent) content!: IonContent;
  isModalOpen = false;
  sourateSelect!:Sourate;
  enterAnimation:any;
  leaveAnimation:any;
  taillemiste:number=0;

  constructor(private sourateservice:CoranService,private animationCtrl: AnimationController,private router: Router,  private fires: AngularFirestore) {
    
   }

  ngOnInit() {
    this.getlisteByFirebase();
    this.animationModal();  
    this.findSourate();
  
  }

  findSourate(){
    this.sourateservice.getAllSourateByAPI();
  }

getlisteByAPIAndSave(){
  this.sourateservice.getAllSourateByAPI();
 
  }
  async getlisteByFirebase(){
    this.listesourates=await this.sourateservice.getAllSourates();
    this.taillemiste=this.listesourates.length;
    }

    async handleInput(event:any) {
      const query = event.target.value.toLowerCase();
        if(event.target.value!=""){
        if (this.listesourates !== undefined) {
          // Appeler toLowerCase() ici
          this.listesourates =await this.listesourates.filter((d) => d.nomFr.toLowerCase().indexOf(query) > -1);
      } 
      }else{
        this.listesourates =await this.sourateservice.getAllSourates();
        
      }
    }
  
    updateItemList(filteredItems: any[]) {
      this.listesourates = filteredItems;
    }
    
  
    filterItems() {
      if(this.searchTerm!=""){
        this.listesourates = this.listesourates.filter(item => item.nomFr.toLowerCase().includes(this.searchTerm.toLowerCase()));
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
    
  
    setOpen(isOpen: boolean, item:Sourate) {
      this.isModalOpen = isOpen;
      this.sourateSelect=item;
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

