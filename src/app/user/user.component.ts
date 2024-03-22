import { Component, OnDestroy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { doc, onSnapshot } from "firebase/firestore";
import { UserTableComponent } from './user-table/user-table.component';






@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIcon, 
    MatButtonModule, 
    MatTooltipModule, 
    MatDialogModule, 
    DialogAddUserComponent, 
    MatTableModule, 
    MatCardModule,
    UserTableComponent
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnDestroy {
  name!: string;

  user = new User();

  firestore: Firestore = inject(Firestore)
  
  displayedColumns: any;

  unsubUsers;

  public userData: any;

  constructor(public dialog: MatDialog){;

    this.unsubUsers = onSnapshot(this.getUsersRef(), (list) => {
      list.forEach(element => {
        this.userData = element.data();
        console.log(this.userData);
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubUsers();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  getUsersRef(){
    return collection(this.firestore, 'users')
  }
}