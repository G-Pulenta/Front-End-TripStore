import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CartDialogComponent} from "../cart-dialog/cart-dialog.component";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor(private router: Router, private dialog: MatDialog) {
  }

  getUsernameFromLocalStorage(): string | null {
    return localStorage.getItem('username');
  }

  openShoppingCartDialog() {
    this.dialog.open(CartDialogComponent, {
      width: '800px',
      height: '500px'
    });
  }

  logout(): void {
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    this.router.navigate(['/login']).then(r => console.log('Logout exitoso.'));
  }
}
