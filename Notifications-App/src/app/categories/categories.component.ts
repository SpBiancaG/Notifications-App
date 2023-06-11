import { NgModule } from '@angular/core';
import { Component, EventEmitter, Output } from '@angular/core';
import { category } from '../category';
import {MatIconModule} from '@angular/material/icon';
import { MatOptionSelectionChange } from '@angular/material/core';
import { AnnouncementService } from '../services/announcement.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})

export class CategoriesComponent {
  @Output() selectedCategory = new EventEmitter<category>();
  selectedCategory1: category | undefined;


  constructor(private as: AnnouncementService){}

  categoriesList: category[] = [
{
  id: '1',
  name: 'General',
},

{
  id: '2',
  name: 'Course',
},

{
  id: '3',
  name: 'Laboratory',
}
];

cat: category = {
  id: '-1',
  name: ' ',
}

selectCategory(index: number) {
    this.selectedCategory.emit(this.categoriesList[index]);
}
}


