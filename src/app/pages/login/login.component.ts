import {AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { UserService } from "../../services/user/user.service";
import lottie from 'lottie-web';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit, OnInit{
  username: string = '';
  password: string = '';

  hide = true;
  isSmallScreen = false;

  @ViewChild('lottieContainer') lottieContainer!: ElementRef;

  constructor(private userService: UserService, private router: Router, private snackBar: MatSnackBar, private renderer: Renderer2) {}

  ngOnInit() {
    this.checkScreenSize();
  }
  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 800;
  }
  validateUser() {

    const snackBarConfig: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    };


    const credentials = {
      username: this.username,
      password: this.password
    };
    this.userService.login(credentials).subscribe(
      (response: any) => {
        if (response) {
          console.log('User validated');
          localStorage.setItem('username', this.username);
          localStorage.setItem('id', response.id);
          this.router.navigate(['home']);
        } else {
          this.snackBar.open('Invalid username or password.', 'Close', snackBarConfig);
          console.log('User not validated');
        }
        this.username = '';
        this.password = '';
      },
      (error: any) => {
        if (error.status === 401) {
          this.snackBar.open('Invalid username or password.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        } else {
          console.error('Error en la petición HTTP:', error);
        }
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
