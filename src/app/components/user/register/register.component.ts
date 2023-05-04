import {Component, OnInit} from '@angular/core';
import lottie from 'lottie-web';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{


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
        path: '../../../assets/lottie/module-register.json'
      });
    }
  }
}
