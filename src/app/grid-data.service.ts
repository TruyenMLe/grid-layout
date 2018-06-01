import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable()
export class GridDataService {
  departments: string[];

  constructor(private http: HttpClient) {
    this.departments = [
      'Chemistry', 'Biology', 'Computer', 'Science', 'Art', 'Physics', 'Math', 'English', 'Literature', 'History', 'Physical Education'
    ];
  }

  getData() {
    return this.http.get('https://randomuser.me/api/?results=500')
      .pipe(map((data: any) => {
        return this.transform(data.results);
      }));
  }

  private transform(data) {
    for (const item of data) {
      const title = item.name.title;
      const first = item.name.first;
      const firstName = first[0].toUpperCase() + first.substring(1, first.length);
      const last = item.name.last;
      const lastName = last[0].toUpperCase() + last.substring(1, last.length);
      item.displayTitle = title[0].toUpperCase() + title.substring(1, title.length);
      item.fullName = `${firstName} ${lastName}`;
      item.address = `${item.location.street}, ${item.location.city} ${item.location.state} ${item.location.postcode}`;
      item.birthDate = (new Date(item.dob)).toLocaleDateString();
      item.departments = [];

      const num = Math.floor((Math.random() * 10) + 1);

      for (let i = 0; i < num; i++) {
        const rand = Math.floor((Math.random() * 10) + 1);

        const match = item.departments.find((department) => department === this.departments[rand]);

        if (match) {
          i = i - 1;
        } else {
          item.departments.push(this.departments[rand]);
        }
      }
    }

    return data;
  }
}
