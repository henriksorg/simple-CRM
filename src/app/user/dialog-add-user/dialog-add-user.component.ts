import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar'
import { NgIf } from '@angular/common';





@Component({
  selector: 'app-dialog-add-user',
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
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {
  user = new User();
  birthDate!: Date;
  loading: boolean = false;
  close: boolean = false;

  constructor(private dialogRef: MatDialogRef<DialogAddUserComponent>) { }
  private firestore: Firestore = inject(Firestore);


  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log(this.user);
    await this.addUser();
    this.dialogRef.close();
  }
  async addUser(){
    this.loading = true;
    await addDoc(this.getUsersRef(), {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      birthDate: this.user.birthDate,
      street: this.user.street,
      zipCode: this.user.zipCode,
      city: this.user.city
    });
    this.loading = false;
    this.close = true;
  }

  getUsersRef(){
    return collection(this.firestore, 'users')
  }
}
