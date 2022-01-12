import { AssignTaskComponent } from './assign-task/assign-task.component';
import { HireWorkerComponent } from './hire-worker/hire-worker.component';
import { BuyCropsComponent } from './buy-crops/buy-crops.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
