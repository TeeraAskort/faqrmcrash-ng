import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { BuyCropsComponent } from './buy-crops/buy-crops.component';
import { CropFilterPipe } from './pipes/crop-filter/crop-filter.pipe';
import { HireWorkerComponent } from './hire-worker/hire-worker.component';
import { WorkerFilterPipe } from './pipes/worker-filter/worker-filter.pipe';
import { AssignTaskComponent } from './assign-task/assign-task.component';
import { StatsComponent } from './stats/stats.component';
import { LeaderboardComponent } from './lists/leaderboard/leaderboard.component';
import { CropListComponent } from './lists/crop-list/crop-list.component';
import { WorkerListComponent } from './lists/worker-list/worker-list.component';
import { ItemListComponent } from './lists/item-list/item-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    BuyCropsComponent,
    CropFilterPipe,
    HireWorkerComponent,
    WorkerFilterPipe,
    AssignTaskComponent,
    StatsComponent,
    LeaderboardComponent,
    CropListComponent,
    WorkerListComponent,
    ItemListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
