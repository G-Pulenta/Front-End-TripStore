import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {UserService} from "../../services/user/user.service";
import lottie from 'lottie-web';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {
  user: any = {};
  @ViewChild('lottieContainer') lottieContainer!: ElementRef;

  constructor(private userService: UserService, private renderer: Renderer2) {
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
  }
}
