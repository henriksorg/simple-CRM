import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { DetailViewComponent } from './user/detail-view/detail-view.component';


export const routes: Routes = [
    {path: '', component : DashboardComponent},
    {path: 'user', component : UserComponent},
    {path: 'user/:id', component : DetailViewComponent},
];
