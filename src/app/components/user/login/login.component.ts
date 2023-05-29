import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { User } from '../../../models/user.model';
import { environment } from '../../../../environments/environment';
import lottie from 'lottie-web';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  hide = true;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {}

  validateUser() {

    const snackBarConfig: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    };

    this.http.get<User[]>(environment.apiUrl).subscribe(users => {
      const user = users.find(u => u.username === this.username && u.password === this.password);
      if (user) {
        console.log('User validated');
        this.router.navigate(['/home']);
      } else {
        this.snackBar.open('Invalid username or password.', 'Close', snackBarConfig);
        console.log('User not validated');
      }
      this.username = '';
      this.password = '';
    });
  }
  ngOnInit(): void {
    const container = document.getElementById('lottie-container');
    if (container !== null) {
      container.style.width = '700px';
      container.style.height = '700px';
      const anim = lottie.loadAnimation({
        container: container as Element,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '../../../assets/lottie/shopping-cart-login.json'
      });
    }
  }
}
