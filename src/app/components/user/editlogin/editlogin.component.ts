import { Component } from '@angular/core';

interface Country {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-editlogin',
  templateUrl: './editlogin.component.html',
  styleUrls: ['./editlogin.component.css']
})
export class EditloginComponent {
  countries: Country[] = [
    {value: 'Peru', viewValue: 'Perú'},
    {value: 'Argentina', viewValue: 'Argentina'},
    {value: 'Brasil', viewValue: 'Brasil'},
    {value: 'Ecuador', viewValue: 'Ecuador'},
    {value: 'Outofamerica', viewValue: 'Out of America Latina'}
  ];
}
