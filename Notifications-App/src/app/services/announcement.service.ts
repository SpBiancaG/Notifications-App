import { Injectable } from '@angular/core';
import { Announcement } from '../announcement';
import { Observable, Subject, catchError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { category } from '../category';


@Injectable({
  providedIn: 'root'
})

export class AnnouncementService {
  baseURL: string = "https://localhost:7038/Announcement"  

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token'
    })
  };


  categorySelected : category;
  subjectAnnouncement: Subject<Announcement[]> = new Subject<Announcement[]>();
  refreshFilteredAnnouncements: Subject<Announcement> =
    new Subject<Announcement>();

  announcements: Announcement[] = [];
  searchedAnnouncement: Announcement[] = [
    {
      title: 'new',
      message: 'new',
      id: 'new',
      author: 'new',
      imageURL: 'new',
      categoryId: '0',
    }
  ];

  categories: category[] = [
    {
      name: 'General',
      id: '1',
    },
    {
      name: 'Course',
      id: '2',  
    },
    {
        name: 'Laboratory',
        id: '3',
    },
  ];
  size: number = this.announcements.length;
  constructor(private httpClient: HttpClient) {}

  serviceCall() {
    console.log('Service was called');
  }
  
  getAnnouncements() : Observable<Announcement[]> {
  return this.httpClient.get<Announcement[]>(this.baseURL, this.httpOptions);
  }

  deleteAnnouncements(annoID: string) : Observable<Announcement> {
    return this.httpClient.delete<Announcement>(this.baseURL + '/' + annoID, this.httpOptions);
    }

  addAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.httpClient.post<Announcement>(this.baseURL, announcement, this.httpOptions)
  }

  findAnnouncementForEdit(id: string): void {
    this.searchedAnnouncement = this.announcements.filter(
      (announ) => announ.id == id
    );
  }

  replaceAnnouncement(announcement: Announcement) {
    announcement.id = this.searchedAnnouncement[0].id;
    announcement.title = this.searchedAnnouncement[0].title;
    announcement.message = this.searchedAnnouncement[0].message;
    announcement.author = this.searchedAnnouncement[0].author;
    announcement.imageURL = this.searchedAnnouncement[0].imageURL;
    }
      findAnnouncementForDelete(id: string) {
    this.searchedAnnouncement = this.announcements.filter(
      (announ) => announ.id === id
    );
    const foundIndex = this.announcements.findIndex(
      (x) => x.id == this.searchedAnnouncement[0].id
    );
    this.searchedAnnouncement.splice(foundIndex, 1);
    this.refreshFilteredAnnouncements.next(this.announcements[foundIndex]);
    this.announcements.splice(foundIndex, 1);
    this.subjectAnnouncement.next(this.announcements);

  }

  updateAnnouncement(announcement: Announcement): Observable<Announcement> {
    console.log("Update apelat;");

   return this.httpClient.put<Announcement>(this.baseURL, announcement, this.httpOptions);
  }
}

