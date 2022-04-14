import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public _accService: AccountService) {}

  LoginStatus$!: Observable<boolean>;

  ngOnInit() {
    this.LoginStatus$ = this._accService.isLoggedIn;
  }

  onLogout() {
    this._accService.logout();
  }
}
