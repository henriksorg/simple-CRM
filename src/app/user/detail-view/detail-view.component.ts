import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DocumentData, Unsubscribe, collection, getDocs } from "firebase/firestore";
import { UserService } from '../user-service/user.service';
import { UserComponent } from '../user.component';
import { User } from '../../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { DialogDeleteUserComponent } from './dialog-delete-user/dialog-delete-user.component';
import { Firestore, doc, onSnapshot } from '@angular/fire/firestore';



@Component({
  selector: 'app-detail-view',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './detail-view.component.html',
  styleUrl: './detail-view.component.scss'
})

export class DetailViewComponent implements OnInit, OnDestroy {
  firestore: Firestore = inject(Firestore);

  user: User = new User;
  private routeSub!: Subscription;
  userId!: string;
  unsubUser: any;

  constructor(private route: ActivatedRoute, private userService: UserService, public dialog: MatDialog,) {
    this.getUserByLink();
    this.getUserById();
  }


  deleteUser() {
    const dialog = this.dialog.open(DialogDeleteUserComponent)
    dialog.componentInstance.user = this.user;
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditUserComponent)
    dialog.componentInstance.user = this.user;
    // this.unsubUser();
  }

  async ngOnInit(): Promise<void> {
    
  }

  getUserByLink() {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
    this.user.id = this.userId;
  }

  getUserById() {
    const docRef = doc(this.firestore, 'users', this.userId);
    this.unsubUser = onSnapshot(docRef, (user) => {
      console.log(user.data());
      this.user =  new User(user.data())
      this.user.id = user.id;
      console.log(this.user);
    });
  }
  
  ngOnDestroy() {
    this.unsubUser();
  }
}



