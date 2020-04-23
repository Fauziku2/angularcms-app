import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from '../../services/page.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-admin-edit-page',
  templateUrl: './admin-edit-page.component.html',
  styleUrls: ['./admin-edit-page.component.scss']
})
export class AdminEditPageComponent implements OnInit {
  page: any;
  title: string;
  content: string;
  id: string;
  successMsg = false;
  errorMsg = false;
  errorMsg2 = false;
  param: any;
  Editor = ClassicEditor;
  sidebar = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private pageService: PageService) {
  }

  ngOnInit() {
    if (localStorage.getItem('user') !== '\"admin\"') {
      this.router.navigateByUrl('');
    }
    this.route.params.subscribe(params => {
      this.param = params.id;
      this.pageService.getEditPage(this.param).subscribe((page: any) => {
        this.page = page;
        this.title = page.title;
        this.content = page.content;
        this.id = page._id;
        if (page.sidebar === 'yes') {
          this.sidebar = true;
        }
      });
    });
  }

  editPage({ value, valid }) {
    if (valid) {
      this.pageService.postEditPage(value).subscribe(res => {
        if (res === 'pageExist') {
          console.log('res', res);
          this.errorMsg = true;
          setTimeout(() => {
            this.errorMsg = false;
          }, 2000);
        } else if (res === 'problem') {
          this.errorMsg2 = true;
          setTimeout(() => {
            this.errorMsg2 = false;
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
    } else {
      console.log('Form is not valid.');
    }
  }

}
