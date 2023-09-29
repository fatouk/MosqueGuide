import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Mosquee } from 'src/collections/Mosquee';


@Injectable({
  providedIn: 'root'
})
export class MosqueesService {
  constructor(private fires: AngularFirestore) { }
  // Recuperer un document en fonction de sa ref
  FindDocByRef(collection:string,ref:string):any{
    return this.fires.doc(collection+'/'+ref);
  }
  getDocumentById(collection:string,documentId: string): Observable<any> {
  return this.fires.collection(collection).doc(documentId).valueChanges();
}
getDocumentById2(collection: string, documentId: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    // Vous devez appeler la méthode .get() pour exécuter la requête.
    // De plus, vous devez utiliser .then() pour gérer la réponse asynchrone.
    this.fires.collection(collection).doc(documentId).get().subscribe((docSnapshot) => {
      // Vérifiez d'abord si le document existe
      if (docSnapshot.exists) {
        // Renvoyez les données du document en utilisant .data()
        console.log("doc trouvé ID :", docSnapshot.data());  
        resolve(docSnapshot.data());
      } else {
        // Si le document n'existe pas, renvoyez null ou un message d'erreur selon votre logique
        reject(null); // ou reject("Document non trouvé");
      }
    })
  });
}
//ajouter Document
addMosqueesDocument(mosquee:Mosquee): Promise<any> {
  return new Promise<string>((resolve, reject) => {
  return this.fires.collection('mosquees').add({
    nom: mosquee.nom,
    imam: mosquee.imam,
    adresse:mosquee.adresse,
    latitude: mosquee.latitude,
    longitude: mosquee.longitude,
    lieuFemme:mosquee.lieuFemme,
    telephone:mosquee.telephone,
    Fadjr: mosquee.Fadjr,
    Duhr: mosquee.Duhr,
    Asr:mosquee.Asr,
    Maghreb:mosquee.Maghreb,
    Icha: mosquee.Icha,
    Jumah: mosquee.Jumah,
    description:mosquee.description,    
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

FindDocByAttribueEqual(collection:string,nomattr:string,valeurattr:string):Promise<any>{
  return new Promise<string>((resolve, reject) => {   
console.log('PARAMS++++++++ :',  collection,nomattr,valeurattr);

this.fires.collection(collection, ref => ref.where(nomattr, '==', valeurattr)).get().subscribe((docSnapshot) => {
  // Vérifiez d'abord si le document existe
  if (docSnapshot) {
    // Renvoyez les données du document en utilisant .data()
    console.log("doc trouvé :", docSnapshot.docs);  
    // resolve();
  } else {
    // Si le document n'existe pas, renvoyez null ou un message d'erreur selon votre logique
    reject(null); // ou reject("Document non trouvé");
  }
});
});
}

FindDocByAttribueEqual2(collection: string, nomattr: string, valeurattr: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    // console.log('PARAMS++++++++ :', collection, nomattr, valeurattr);

    this.fires.collection(collection, ref => ref.where(nomattr, '==', valeurattr))
      .get()
      .subscribe((querySnapshot) => {
        // Vérifiez d'abord si le document existe
        if (!querySnapshot.empty) {
          // Le document existe, renvoyez les données du premier document trouvé
          const doc = querySnapshot.docs[0].data();
          console.log("doc trouvé++++++++++++ 2222222222:", doc);
          resolve(doc);
        } else {
          // Si le document n'existe pas, renvoyez null ou un message d'erreur selon votre logique
          reject(null); // ou reject("Document non trouvé");
        }
      });
  });
}
getAllMosquees(): Promise<any>{
  return new Promise<any>((resolve, reject) => {
    this.fires.collection('mosquees').valueChanges()
    .subscribe(response => {
      if (response) {
         console.log("ma liste============",response);
      resolve(response)      
      }else
      {reject()}
    })
  });

}

}

