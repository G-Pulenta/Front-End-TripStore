import {Component, OnInit} from '@angular/core';
import lottie from 'lottie-web';
import {UserService} from "../../../services/user/user.service";
import {User} from "../../../models/user.model";
import {NgForm} from "@angular/forms";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  newUser: User = {
    username: '',
    password: '',
    email: '',
    phone: ''
  };
  constructor(private userService: UserService) {}
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
  onSubmit(form: NgForm) {
    this.userService.createUser(this.newUser).subscribe(
      user => {
        console.log('User created:', user);
        form.resetForm();
      },
      error => console.error('Error creating user:', error)
    );
  }
}
