import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor() {}

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());

  login(username: string, password: string) {
    //comprobar que la contraseña es correcta
    console.log('loggeo ' + username + ' ' + password);
    if (username === 'admin' && password === 'admin') {
      this.loginStatus.next(true);
      localStorage.setItem('user', username);
      return observableOf(true);
    } else {
      alert('usuario y/o contraseña incorrectos');
      return observableOf(false);
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

  checkLoginStatus(): boolean {
    console.log('locals: ' + localStorage.getItem('user'));
    if (localStorage.getItem('user') === null) {
      return false;
    }
    return true;
  }

  get isLoggedIn() {
    return this.loginStatus.asObservable();
  }
}
