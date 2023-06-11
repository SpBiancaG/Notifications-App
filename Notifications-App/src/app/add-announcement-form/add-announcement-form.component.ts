import { Component, Input } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { Announcement } from '../announcement';
import { CategoriesComponent } from '../categories/categories.component';
import { category } from '../category';
import { AnnouncementService } from '../services/announcement.service';
import { MatSelectChange } from '@angular/material/select';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-announcement-form',
  templateUrl: './add-announcement-form.component.html',
  styleUrls: ['./add-announcement-form.component.scss']
})


export class AddAnnouncementFormComponent {
  title!: string;
  author!: string;
  imageURL!: string;
  textarea!: string;
  selectedCategory!: string;
  id!: string;


  constructor(private announcementService: AnnouncementService, private router: Router){}

categories: category[] = this.announcementService.categories;
selectedCateg: category = {id: ' ', name: ' '}


submitForm() {
  console.log(this.selectedCateg.name + " a fost selectat.");

  const announcement: Announcement = {
    id: 'undefined',
    title: this.title,
    message: this.textarea,
    author: this.author,
    imageURL: this.imageURL,
    categoryId: this.selectedCateg.id
  };

  if(this.title == null){
  }
  
  console.log(announcement);
  this.announcementService.addAnnouncement(announcement).subscribe(r => {
    this.router.navigateByUrl("");
  });
}

onSubmit(form: NgForm) {
  console.log(form.value);

  const id: string = 'c25de3dd-636d-4c00-9b5a-059ebabd2084';

  let announcement: Announcement = {
    title: this.title,
    message: this.textarea,
    author: this.author,
    categoryId: this.selectedCateg.id,
    imageURL: this.imageURL,
    id: id,
  }
  
  console.log(announcement.id);

    this.announcementService.addAnnouncement(announcement).subscribe(r => {
      this.router.navigateByUrl("");}
    );
  }

categoryReceived(event : MatSelectChange){
  const categoryId = event.value; // Obține ID-ul selectat din evenimentul de selecție

  // Caută obiectul 'category' corespunzător în lista 'categories' în funcție de ID
  this.selectedCateg = this.categories.find(category => category.id == categoryId);
  console.log(this.selectedCateg.name);
  console.log(this.selectedCateg.id);

};
}
