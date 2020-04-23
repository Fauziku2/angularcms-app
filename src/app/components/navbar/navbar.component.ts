import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  pages: any;
  user: string;

  get userLogged() {
    if (localStorage.getItem('user')) {
      this.user = localStorage.getItem('user').replace(/\"/g, '');
      return true;
    }
    return false;
  }

  constructor(private pageService: PageService, private http: HttpClient) {
  }

  ngOnInit() {
    this.pageService.getPages().subscribe((pages: string) => {
      this.pageService.pagesBS.next(pages);
      this.pages = this.pageService.pagesBS;
    }, error => {
      console.log(error);
    });
  }
}
