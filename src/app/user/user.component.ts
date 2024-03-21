import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';





@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIcon, MatButtonModule, MatTooltipModule, MatDialogModule, DialogAddUserComponent ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  name!: string;

  user = new User();

  firestore: Firestore = inject(Firestore)
  items$: Observable<any[]>;

  constructor(public dialog: MatDialog){
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {
      // data: {name: this.name},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
}
