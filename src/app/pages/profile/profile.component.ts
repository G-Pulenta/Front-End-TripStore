import {AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {Router} from "@angular/router";
import lottie from "lottie-web";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements AfterViewInit, OnInit {
  user: any = {};
  @ViewChild('lottieContainer') lottieContainer!: ElementRef;

  constructor(private userService: UserService, private renderer: Renderer2, private router: Router, private snackBar: MatSnackBar) {
  }
  isSmallScreen = false;

  ngOnInit() {
    this.checkScreenSize();
  }
  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 800;
  }
  ngAfterViewInit(): void {
    this.loadAnimation();
    this.getUserData();
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
      path: '../../../assets/lottie/image-profile.json'
    });
  }

  getUserData(): void {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.userService.getUser(userId).subscribe(
        (response: any) => {
          this.user = response;
        },
        error => {
          console.error('Error al obtener los datos del usuario:', error);
        }
      );
    } else {
      console.error('ID de usuario no encontrado en el localStorage.');
    }
  }

  delete(): void {
    const userId = localStorage.getItem('id');
    if (userId) {
      if (confirm('Are you sure you want to delete your profile?')) {
        this.userService.deleteUser(userId).subscribe(
          (response: any) => {
            console.log('Profile deleted:', response);
            localStorage.removeItem('id');
            localStorage.removeItem('username');
            this.router.navigate(['/login']).then(r => console.log('Delete users.'));
          },
          error => {
            console.error('Error deleting profile:', error);
          }
        );
      }
    } else {
      console.error('User ID not found in localStorage.');
    }
  }

  register() {
    const snackBarConfig: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    };
    const userId = localStorage.getItem('id');
    if (userId) {
      this.user.id = userId;
      this.userService.updateUser(this.user).subscribe(
        (response: any) => {
          this.snackBar.open('Profile Updated.', 'Close', snackBarConfig);
          console.log('Profile Updated:', response);
        },
        error => {
          console.error('Error al actualizar el perfil de usuario:', error);
        }
      );
    } else {
      console.error('ID de usuario no encontrado en el localStorage.');
    }
  }
}

