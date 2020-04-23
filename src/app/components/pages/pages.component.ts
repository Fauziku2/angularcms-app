import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../../services/page.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  private param: any;
  public pageBody: any;
  public pages: any;
  public sidebar: string;
  public hasSidebar: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private sidebarService: SidebarService,
    private pageService: PageService) {
  }

  ngOnInit() {
    this.pageService.getPages().subscribe(pages => {
      this.pages = pages;
    });

    this.route.params.subscribe((params: any) => {
      this.param = params.page;
      if (!this.param) {
        this.param = 'home';
        this.title.setTitle('CMS');
      } else {
        this.title.setTitle(this.param.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()));
      }

      this.pageService.getPage(this.param).subscribe((pageBody: any) => {
        if (!pageBody) {
          this.router.navigateByUrl('');
        }
        this.pageBody = pageBody;

        if (pageBody.sidebar === 'yes') {
          this.hasSidebar = true;
          this.sidebarService.getSidebar().subscribe((sidebar: any) => {
            this.sidebar = sidebar.content;
          });
        } else {
          this.hasSidebar = false;
        }
      });
    });
  }
}
