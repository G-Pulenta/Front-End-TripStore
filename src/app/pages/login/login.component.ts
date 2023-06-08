import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserService } from "../../services/user/user.service";
import lottie from 'lottie-web';
import {DashboardComponent} from "../dashboard/dashboard.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{
  username: string = '';
  password: string = '';

  hide = true;

  @ViewChild('lottieContainer') lottieContainer!: ElementRef;

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar, private renderer: Renderer2) {}

  validateUser() {

    const snackBarConfig: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    };
    this.userService.loginUser(this.username, this.password).subscribe(
      (response: any) => {
        if (response.length > 0) {
          console.log('User validated');
          localStorage.setItem('username', this.username);
          localStorage.setItem('id', response[0].id);

          this.router.navigate(['dashboard']).then(r => DashboardComponent);
        } else {
          this.snackBar.open('Invalid username or password.', 'Close', snackBarConfig);
          console.log('User not validated');
        }
        this.username = '';
        this.password = '';
      },
      (error: any) => {
        console.error('Error en la petición HTTP:', error);
      }
    );
  }
  ngAfterViewInit(): void {
    this.loadAnimation();
  }

  loadAnimation(): void {
    const container = this.lottieContainer.nativeElement;
    this.renderer.setStyle(container, 'width', '700px');
    this.renderer.setStyle(container, 'height', '700px');

    const anim = lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../../../assets/lottie/image-login.json'
    });
  }
}
