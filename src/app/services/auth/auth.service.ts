import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {LoginComponent} from "../../pages/login/login.component";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(): boolean {
    const userId = localStorage.getItem('id');
    if (!userId) {
      this.router.navigate(['/login']).then(r => LoginComponent);
      return false;
    }
    return true;
  }
}
