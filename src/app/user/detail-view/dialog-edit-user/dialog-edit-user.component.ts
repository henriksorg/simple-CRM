
import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../../../models/user.class';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc, doc } from '@angular/fire/firestore';
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
export class DialogEditUserComponent {
  loading = false;
  user = new User();
  birthDate!: Date;
  private firestore: Firestore = inject(Firestore);
  userRef;
  

  constructor(firestore: Firestore, public dialogRef: MatDialogRef<DialogEditUserComponent>) {
    this.userRef = doc(collection(this.firestore, 'users'));
  }


  async saveUser() {
    
  }
}
