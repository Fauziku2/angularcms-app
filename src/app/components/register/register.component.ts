import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  userExist = false;

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      this.router.navigateByUrl('');
    }
  }

  register({ value, valid }) {
    if (valid) {
      this.userService.register(value).subscribe(res => {
        if (res === 'userExist') {
          this.userExist = true;
          setTimeout(() => {
            this.userExist = false;
          }, 2000);
        } else {
          localStorage.setItem('userRegistered', 'true');
          this.router.navigateByUrl('login');
        }
      });
    } else {
      console.log('Form is not valid.');
    }
  }
}
