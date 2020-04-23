import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
  content: string;
  successMsg = false;
  Editor = ClassicEditor;

  constructor(private sidebarService: SidebarService,
              private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('user') !== '\"admin\"') {
      this.router.navigateByUrl('');
    }

    this.sidebarService.getSidebar().subscribe(res => {
      this.content = res.content;
    }, err => {
      console.log(err);
    });
  }

  editSidebar({ value }) {
    this.sidebarService.postSidebar(value).subscribe(res => {
      console.log('res', res);
      this.successMsg = true;
      setTimeout(() => {
        this.successMsg = false;
      }, 2000);
    });
  }

}
