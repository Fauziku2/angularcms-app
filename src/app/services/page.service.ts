import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  public pagesBS = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) {
  }

  getPages() {
    return this.http.get('http://localhost:3000/pages');
  }

  getPage(slug: string) {
    return this.http.get('http://localhost:3000/pages/' + slug);
  }

  postAddPage(value: any) {
    return this.http.post('http://localhost:3000/pages/add-page', value);
  }

  getEditPage(id: string) {
    return this.http.get('http://localhost:3000/pages/edit-page/' + id);
  }

  postEditPage(value: any) {
    return this.http.put(`http://localhost:3000/pages/edit-page/${value.id}`, value);
  }

  deletePage(id: string) {
    return this.http.delete('http://localhost:3000/pages/delete-page/' + id);
  }

}
