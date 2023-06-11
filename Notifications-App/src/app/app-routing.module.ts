import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Route } from '@angular/router';
import { AppComponent } from './app.component';
import { AddAnnouncementFormComponent } from './add-announcement-form/add-announcement-form.component';
import { HomeComponent } from './home/home.component';
import { EditAnnouncementComponent } from './edit-announcement/edit-announcement.component';


const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'add', component: AddAnnouncementFormComponent },
  { path: 'edit', component: EditAnnouncementComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule,
     RouterModule.forRoot(routes)],
})


export class AppRoutingModule {

 }
