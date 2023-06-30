import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CartDialogComponent} from "../cart-dialog/cart-dialog.component";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
  isSmallScreen: boolean = false;
  constructor(private router: Router, private dialog: MatDialog, private breakpointObserver: BreakpointObserver) {
  }
  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe(result => {
        this.isSmallScreen = result.matches;
      });
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
    localStorage.removeItem('cartId');
    this.router.navigate(['/login']).then(r => console.log('Logout exitoso.'));
  }
}
