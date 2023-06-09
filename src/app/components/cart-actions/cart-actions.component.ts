import { Component } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-cart-actions',
  templateUrl: './cart-actions.component.html',
  styleUrls: ['./cart-actions.component.css']
})
export class CartActionsComponent {
  shoppingCart: any[] = [];
  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    const userId = localStorage.getItem('id');

    if (userId) {
      this.userService.getUser(userId).subscribe((user: any) => {
        this.shoppingCart = user.shoppingCart;
      });
    }
  }

  checkout() {

  }

  clearCart() {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.userService.getUser(userId).subscribe((user: any) => {
        const updatedUser = { ...user, shoppingCart: [] };
        this.userService.updateUser(updatedUser).subscribe(() => {
          this.shoppingCart = [];
          console.log('User shopping cart cleared');
        });
      });
      this.snackBar.open('Shopping cart cleared', 'Close', {
        duration: 3000,
      });

      this.dialog.closeAll();
    }
  }
}
