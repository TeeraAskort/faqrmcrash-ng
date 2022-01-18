import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { WorkerListComponent } from './lists/worker-list/worker-list.component';
import { CropListComponent } from './lists/crop-list/crop-list.component';
import { LeaderboardComponent } from './lists/leaderboard/leaderboard.component';
import { StatsComponent } from './stats/stats.component';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { HireWorkerComponent } from './hire-worker/hire-worker.component';
import { BuyCropsComponent } from './buy-crops/buy-crops.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ItemListComponent } from './lists/item-list/item-list.component';
import { UserInfoComponent } from './user/user-info/user-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'buy-crops', component: BuyCropsComponent, canActivate: [AuthGuard] },
  {
    path: 'hire-worker',
    component: HireWorkerComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'assign-task/:index',
    component: AssignTaskComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'stats',
    component: StatsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'crop-list',
    component: CropListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'worker-list',
    component: WorkerListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'item-list',
    component: ItemListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-info',
    component: UserInfoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
