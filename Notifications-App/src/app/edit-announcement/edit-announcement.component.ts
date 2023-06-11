import { Component, OnInit } from '@angular/core';
import { category } from '../category';
import { AnnouncementService } from '../services/announcement.service';
import { Announcement } from '../announcement';
import { CategoriesComponent } from '../categories/categories.component';
import { Route, Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-edit-announcement',
  templateUrl: './edit-announcement.component.html',
  styleUrls: ['./edit-announcement.component.scss']
})


  export class EditAnnouncementComponent {
    title!: string;
    author!: string;
    imageURL!: string;
    textarea!: string;
    selectedCategory!: string;
    cat: category = {id: '-1', name: 'none'}


    announcement: Announcement = {
      title: 'undefined',
      message: 'undefined',
      author: ' undefined',
      id: ' undefined',
      categoryId: ' undefined',
      imageURL: ' undefined',
    }
    
    constructor(public announcementService: AnnouncementService, private router: Router) {
          this.announcement.id = this.announcementService.searchedAnnouncement[0].id;
          this.announcement.categoryId = this.announcementService.searchedAnnouncement[0].categoryId;
        }
  
    editAnnouncement() {

      if(this.title != null)
      {
        this.announcement.title = this.title;
      }
      else{
        this.announcement.title = this.announcementService.searchedAnnouncement[0].title;
      }

      if(this.textarea != null)
      {
        this.announcement.message = this.textarea;
      }
      else{
        this.announcement.message = this.announcementService.searchedAnnouncement[0].message;
      }

      if(this.author != null)
      {
        this.announcement.author = this.author;
      }
      else{
        this.announcement.author = this.announcementService.searchedAnnouncement[0].author;
      }
      if(this.imageURL != null)
      {
        this.announcement.imageURL = this.imageURL;
      }
      else{
        this.imageURL = this.announcementService.searchedAnnouncement[0].imageURL
      }

      if(this.cat.id != '-1'){
        this.announcement.categoryId = this.cat.id;
      }

      this.announcementService.updateAnnouncement(this.announcement).subscribe(r => {
        this.router.navigateByUrl("");}
      );

    }

    categoryReceived(event : MatSelectChange){
      const categoryId = event.value;
      this.cat = this.announcementService.categories.find(category => category.id == categoryId);
      console.log(this.cat.name);
    };
  }
  