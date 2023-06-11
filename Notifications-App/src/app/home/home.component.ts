import { Component, EventEmitter } from '@angular/core';
import { category } from '../category';
import { Announcement } from '../announcement';
import { AnnouncementService } from '../services/announcement.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  announcements!: Announcement[];

  filteredAnnouncement!: Announcement[];
  selectedCategory!: EventEmitter<category>;

categorySelected : category = {
  name: 'category selected',
  id: '0',
};

  
  constructor(private announcementService: AnnouncementService) {}

  ngOnInit(): void {
    this.announcementService.serviceCall();
    this.announcementService.getAnnouncements().subscribe((data) => {
      this.announcements = data;
    });
    this.announcementService.subjectAnnouncement.subscribe((data) => {
      this.announcements = data;
    });
    this.announcementService.refreshFilteredAnnouncements.subscribe((data) => {
      const foundIndex = this.filteredAnnouncement.findIndex(
        (x) => x.id == data.id
      );
      this.filteredAnnouncement.splice(foundIndex, 1);
    });
  }
  
  categoryReceived(cat: category) {
    this.announcementService.getAnnouncements().subscribe(
      (announcements: Announcement[]) => {
        if(cat.id != '0'){
          this.filteredAnnouncement = announcements.filter((announ) => announ.categoryId == cat.id);
          this.announcementService.announcements = this.filteredAnnouncement;
          console.log(this.filteredAnnouncement);
        }
        else{
          this.filteredAnnouncement.splice(0, length);
          console.log(this.filteredAnnouncement);
        }
      },

      (error: any) => {
        console.error('A apărut o eroare la obținerea anunțurilor:', error);
      }
    );  
  }
}
