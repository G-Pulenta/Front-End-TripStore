import {AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import lottie from 'lottie-web';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit, OnInit {
  user: any = {};
  @ViewChild('lottieContainer') lottieContainer!: ElementRef;

  isSmallScreen = false;

  ngOnInit() {
    this.checkScreenSize();
  }
  @HostListener('window:resize', ['$event'])
  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 800;
  }
  constructor(
    private userService: UserService,
    private renderer: Renderer2,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

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
      path: '../../../assets/lottie/image-register.json'
    });
  }

  register() {
    this.userService.registerUser(this.user)
      .subscribe(
        response => {
          console.log('Usuario registrado exitosamente:', response);
        },
        error => {
          console.error('Error al registrar usuario:', error);
        }
      );

    this.snackBar.open('User registered successfully', 'Close', {
      duration: 3500
    });

    this.router.navigate(['login']);
  }
}
