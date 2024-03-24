import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { DocumentData, collection, getDocs } from "firebase/firestore";
import { UserService } from '../user-service/user.service';
import { UserComponent } from '../user.component';
import { User } from '../../../models/user.class';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { DialogDeleteUserComponent } from './dialog-delete-user/dialog-delete-user.component';



@Component({
  selector: 'app-detail-view',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './detail-view.component.html',
  styleUrl: './detail-view.component.scss'
})

export class DetailViewComponent implements OnInit, OnDestroy {
  user: User = new User;
  private routeSub!: Subscription;
  userId!: string;

  constructor(private route: ActivatedRoute, private userService: UserService, public dialog: MatDialog,) { }
  deleteUser() {
    const dialog = this.dialog.open(DialogDeleteUserComponent)
    dialog.componentInstance.user = this.user;
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditUserComponent)
    dialog.componentInstance.user = this.user;
  }

  async ngOnInit(): Promise<void> {
    this.getUserByLink();
  }

  async getUserByLink() {
    this.routeSub = this.route.params.subscribe(params => {
      console.log('getting the params:', params);
      this.userId = params['id'];
      console.log('user id from link:', this.userId);
    });
    let user = await this.userService.getUserById(this.userId)
    console.log('raw user:', user);
    this.user = new User(user)
    this.user.id = this.userId;
    console.log('finished user', user);

  }


  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}