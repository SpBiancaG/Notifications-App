import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'author'
})
@Pipe({
  name: 'author'
})
export class AuthorPipe implements PipeTransform {
  transform(author: string): string {
    return `By Author ${author}`;
  }
}
