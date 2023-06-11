import { Component, Input } from '@angular/core';
import { Announcement } from '../announcement';
import { category } from '../category';
import { AnnouncementService } from '../services/announcement.service';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent{
  @Input() message: string | undefined;
  @Input() title: string | undefined;
  @Input() author: string | undefined;
  @Input() imageURL: string | undefined;
  @Input() categoryId: string | undefined;
  @Input() id: string | undefined;
  

  constructor(
    private announcementService: AnnouncementService,
    private router: Router
  ) 
  {

  }

  
  categories : category[] = this.announcementService.categories;

  newAnnouncement: Announcement = {
    title: 'new',
    message: 'new',
    imageURL: 'new',
    author: 'new',
    id: '0',
    categoryId: '0',
  };


   addAnnouncement() {
    console.log('New Announcement:', this.newAnnouncement);
  }

  editAnnouncement() {
    console.log(this.id);
    this.announcementService.findAnnouncementForEdit(this.id);
  }

  deleteAnnouncement() {
    console.log("Apelat delete");
    const annoID : Announcement = this.announcementService.announcements.find((annoID) => annoID.id == this.id)
    console.log(annoID.id + " trimis.");
    this.announcementService.deleteAnnouncements(annoID.id).subscribe();
  }
}

