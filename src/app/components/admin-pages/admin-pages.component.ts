import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.scss']
})
export class AdminPagesComponent implements OnInit {
  pages: any;
  successMsg = false;
  errorMsg = false;

  constructor(private pageService: PageService,
              private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('user') !== '\"admin\"') {
      this.router.navigateByUrl('');
    }
    this.pages = this.pageService.pagesBS;
  }

  deletePage(id: string) {
    if (confirm('Confirm deletion')) {
      this.pageService.deletePage(id).subscribe(res => {
        console.log('res', res);
        if (res === 'error') {
          this.errorMsg = true;
          setTimeout(() => {
            this.errorMsg = false;
          }, 2000);
        } else {
          this.successMsg = true;
          setTimeout(() => {
            this.successMsg = false;
          }, 2000);

          this.pageService.getPages().subscribe((pages: any) => {
            this.pageService.pagesBS.next(pages);
          });
        }
      });
    }
  }

}
