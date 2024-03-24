import { Component, inject } from '@angular/core';
import { User } from '../../../../models/user.class';
import { FirebaseApp } from '@angular/fire/app/firebase';
import { Firestore, collection, deleteDoc, doc } from '@angular/fire/firestore';
import { MatDialog, MatDialogActions, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dialog-delete-user',
  standalone: true,
  imports: [MatDialogActions, MatDialogContent, MatDialogModule, MatButtonModule, RouterLink],
  templateUrl: './dialog-delete-user.component.html',
  styleUrl: './dialog-delete-user.component.scss'
})
export class DialogDeleteUserComponent {
  private firestore: Firestore = inject(Firestore);
  userRef!: void;

  user: User = new User;
  constructor(public dialog: MatDialog) {
  }
  async delete() {
    const docRef = doc(this.firestore, `users`, this.user.id);
    await deleteDoc(docRef);
    // this.router.navigate(["/home"]);
  }
}