import {Component, Input, OnInit} from '@angular/core';
import {UserRegisterService} from './user-register.service';
import {ApplicationUser} from '../models/application-user.model';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  userService: UserRegisterService;
  @Input() userRegister: ApplicationUser = new ApplicationUser();
  errorToShow;
  userRegisteredMessage: string;

  constructor(private service: UserRegisterService, private router: Router, private cookieService: CookieService  ) {
  }

  ngOnInit() {
    this.userService = this.service;
    if (this.service.isUserAuthorised()) {
      this.router.navigate(['']);
    }
  }

  registerUser() {
    this.service.registerUser(this.userRegister).subscribe(resp => {
        this.userRegisteredMessage = 'User has been registered correctly';
        this.userRegister = new ApplicationUser();
        console.log(resp);
      },
      (err: HttpErrorResponse) => {

        this.errorToShow = null;
        this.userRegisteredMessage = null;

        if (err.status !== 200 || 201) {
          this.errorToShow = err.error.errors[0];
        }
      }
    );
  }

  loginUser() {
    console.log(this.userRegister);
    this.service.loginUser(this.userRegister).subscribe(resp => {
      localStorage.clear();
      localStorage.setItem('authUser', JSON.stringify(resp));
      this.cookieService.set('userName', resp.applicationUser.firstName);
      this.cookieService.set('userLastName', resp.applicationUser.lastName);
      this.cookieService.set('userEmail', resp.applicationUser.email);
      this.service.loginedUser = resp;
      this.router.navigate(['/']);
    });
  }

}
