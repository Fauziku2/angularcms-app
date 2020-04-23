import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from '../../services/page.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-admin-add-page',
  templateUrl: './admin-add-page.component.html',
  styleUrls: ['./admin-add-page.component.scss']
})
export class AdminAddPageComponent implements OnInit {
  successMsg = false;
  errorMsg = false;
  title: string;
  content = '';
  hasSidebar = false;
  Editor = ClassicEditor;

  constructor(private pageService: PageService,
              private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('user') !== '\"admin\"') {
      this.router.navigateByUrl('');
    }
  }

  addPage({ form, value, valid }) {
    form.reset();
    if (valid) {
      this.pageService.postAddPage(value).subscribe(res => {
        if (res === 'pageExist') {
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
    } else {
      console.log('Form is not valid.');
    }
  }

}
