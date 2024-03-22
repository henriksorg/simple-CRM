import { Injectable, OnDestroy, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { DocumentData, QueryDocumentSnapshot, Unsubscribe, doc, onSnapshot } from "firebase/firestore";
import { Observable } from 'rxjs';
import { UserTableItem } from '../user-table/user-table-datasource';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  firestore: Firestore = inject(Firestore)
  userData: any;

  constructor() {
    this.unsubUsers();
  }

  getUsers(): Observable<UserTableItem[]> {
    const usersRef = collection(this.firestore, 'users');
    // Dies gibt ein Observable zurück, das bei jeder Änderung in der 'users'-Sammlung aktualisiert wird
    return collectionData(usersRef, { idField: 'id' }) as Observable<UserTableItem[]>;
  }

  unsubUsers(){
    onSnapshot(this.getUsersRef(), (list) => {
      let userJSON: DocumentData[] = [];
      list.forEach(element => {
        userJSON.push(element.data());
      });
      this.userData = userJSON;
      console.log(this.userData);
    });
  }
  
  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  ngOnDestroy(): void {
    this.unsubUsers();
  }
}