import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { QuranResponse } from 'src/collections/QuranResponse';
import { Sourate } from 'src/collections/Sourate';
import { Versets } from 'src/collections/Versets';

@Injectable({
  providedIn: 'root'
})
export class CoranService {
  sourate!:Sourate; 
  verset!:Versets;
  constructor(private http:HttpClient,private fires: AngularFirestore) {}

  addSouratesDocument(sourate:Sourate): Promise<any> {
    return new Promise<string>((resolve, reject) => {
    return this.fires.collection('sourate').add({      
    nomFr:sourate.nomFr,
    nomAr:sourate.nomAr,
    numero:sourate.numero,
    urlson:sourate.urlson,
    nombreverset:sourate.nombreverset, 
    }).then((docRef) => {
      // console.log("Document ajouté avec succès avec l'ID :", docRef.id);   
      // docRef.id contient l'identifiant du document nouvellement créé
       resolve(docRef.id);
    }).catch((error) => {
        // console.error("Erreur lors de l'ajout du document :", error);
        reject("Erreur lors de l'ajout du document :"+error);
      });
  
  });
}

  getAllSourates():Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.fires.collection('sourate').valueChanges()
    .subscribe(response => {
      if (response) {
         console.log("sourate fire============",response);
      resolve(response)      
      }else
      {reject()}
    })
    });
  }

  getAllSouratesByAPI():Promise<any>{    
    return new Promise<any>((resolve, reject) => {
      this.http.get(`http://api.alquran.cloud/v1/quran/quran-uthmani`).forEach(data1=>{   
      if (data1) {
         console.log("sourate============",data1);
      resolve(data1)      
      }else
      {reject(null)}
    })
    });
  }
   getAllSourateByAPI(){       
      this.http.get<QuranResponse>(`http://api.alquran.cloud/v1/quran/quran-uthmani`).subscribe(response=>{   
        // console.log("sourate============",response.data.surahs);
      if (response) {        
        response.data.surahs.forEach(async s=>{
          this.sourate = {
            _id:"",
            nomFr: s.englishName,
            nomAr: s.name ,
            numero: s.number,
            urlson: "",
            nombreverset: s.ayahs.length
          };              
          // this.addSouratesDocument(this.sourate);
          let refe= await this.FindDocByAttribueEqual("sourate","nomFr",s.englishName);
          console.log("refe==========",refe);
          s.ayahs.forEach((ay: any)=>{
            console.log("ayat======",ay);
            this.verset={
              _id: "",
              numero:ay.number,
              text: ay.text,
              numeroSourate: ay.numberInSurah,
              sourate:refe
            }
            // this.addVersetDocumentBySourate(this.verset);
          })

        }
        )
     }else
      {(null)}
    })

  }

  FindDocByAttribueEqual(collection:string,nomattr:string,valeurattr:string) :Promise<any>{
    return new Promise<string>((resolve, reject) => {   
   this.fires.collection(collection, ref => ref.where(nomattr, '==', valeurattr)).get().subscribe((docSnapshot) => {
    // Vérifiez d'abord si le document existe
    if (docSnapshot) {
      // Renvoyez les données du document en utilisant .data()
         docSnapshot.forEach(dc=>{   
          const reff= dc.ref.id;   
          // console.log("sourate trouvé :",  dc.ref.id);
          resolve(reff);
      })  
     } else {
      // Si le document n'existe pas, renvoyez null ou un message d'erreur selon votre logique
      reject(null); // ou reject("Document non trouvé");
    }
  });
  });
  }

  addVersetDocumentBySourate(verset:Versets): Promise<any> {
    return new Promise<string>((resolve, reject) => {
    return this.fires.collection('versets').add({     
    numero:verset.numero,
    texte:verset.text,
    numeroSourate:verset.numeroSourate,
    Sourate:verset.sourate,
   
    }).then((docRef) => {
      // console.log("Document ajouté avec succès avec l'ID :", docRef.id);   
      // docRef.id contient l'identifiant du document nouvellement créé
       resolve(docRef.id);
    }).catch((error) => {
        // console.error("Erreur lors de l'ajout du document :", error);
        reject("Erreur lors de l'ajout du document :"+error);
      });
  
  });
}

FindListVersetsByRefSourate(collection:string,nomattr:string,valeurattr:string) :Promise<any>{
  return new Promise<string>((resolve, reject) => {   
 this.fires.collection(collection, ref => ref.where(nomattr, '==', valeurattr)).get().subscribe((docSnapshot) => {
  // Vérifiez d'abord si le document existe
  if (docSnapshot) {
    // Renvoyez les données du document en utilisant .data()
       docSnapshot.forEach(dc=>{   
        const reff= dc.ref.id;   
        console.log("sourate trouvé :",  dc.ref.id);
        resolve(reff);
    })  
   } else {
    // Si le document n'existe pas, renvoyez null ou un message d'erreur selon votre logique
    reject(null); // ou reject("Document non trouvé");
  }
});
});
}
}
