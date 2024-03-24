import { Component, OnDestroy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from './dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { doc, onSnapshot } from "firebase/firestore";
import { UserTableComponent } from './user-table/user-table.component';
import { UserService } from './user-service/user.service';






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
export class UserComponent {
  name!: string;



  constructor(public dialog: MatDialog, public userService: UserService) {
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddUserComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}