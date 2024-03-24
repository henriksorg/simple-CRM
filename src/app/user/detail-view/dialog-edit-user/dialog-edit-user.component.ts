
import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, doc, updateDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
    NgIf],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent implements OnInit {
  loading = false;
  user = new User();
  userCopy!: User;
  birthDate!: Date;
  private firestore: Firestore = inject(Firestore);
  userRef;
  

  constructor(firestore: Firestore, public dialogRef: MatDialogRef<DialogEditUserComponent>) {
    this.userRef = doc(collection(this.firestore, 'users', this.user.id));
  }
  ngOnInit(): void {
    this.userCopy = new User(this.user);
    console.log('my user copy:', this.userCopy);
  }


  async saveUser() {
    const docRef = doc(this.firestore, `users`, this.user.id);
    await updateDoc(docRef,{
      firstName: this.userCopy.firstName,
      lastName: this.userCopy.lastName,
      email: this.userCopy.email, 
      birthDate: this.userCopy.birthDate,
      street: this.userCopy.street,
      zipCode: this.userCopy.zipCode,
      city: this.userCopy.city,
    });
    console.log(this.user.email);
  }
}
