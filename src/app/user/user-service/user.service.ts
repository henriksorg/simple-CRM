import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, collection, collectionData, getDoc, onSnapshot } from '@angular/fire/firestore';
import {  doc } from "firebase/firestore";
import { Observable, Subscription } from 'rxjs';
import { UserTableItem } from '../user-table/user-table-datasource';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.class';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  firestore: Firestore = inject(Firestore);
  userData: any;

  

  constructor() {
    // this.unsubUsers();
  }

  async getUserById(id: string) {
    const docRef = doc(this.firestore, 'users', id);
    // const docSnap = await getDoc(docRef);
    const unsub = onSnapshot(docRef, (doc) => {
      console.log("Current data: ", doc.data());
      doc.data();
    });
  }

  getUsers(): Observable<UserTableItem[]> {
    const usersRef = collection(this.firestore, 'users');
    // Dies gibt ein Observable zurück, das bei jeder Änderung in der 'users'-Sammlung aktualisiert wird
    return collectionData(usersRef, { idField: 'id' }) as Observable<UserTableItem[]>;
  }

  

  // unsubUsers(){
  //   onSnapshot(this.getUsersRef(), (list) => {
  //     let userJSON: DocumentData[] = [];
  //     list.forEach(element => {
  //       userJSON.push(element.data());
  //     });
  //     this.userData = userJSON;
  //     console.log(this.userData);
  //   });
  // }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  ngOnDestroy(): void {
    // this.unsubUsers();
  }
}