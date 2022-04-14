import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(public _accService: AccountService, public router: Router) {}
  login() {
    this._accService.login(this.username, this.password).subscribe((result) => {
      if (result) {
        console.log('User Logged In Successfully');
        this.router.navigate(['/']);
      } else {
        console.log('Error en el inicio de sesión');
      }
    });
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    var usur = localStorage.getItem('user');
    console.log(usur);
    return localStorage.getItem('user');
  }
}
