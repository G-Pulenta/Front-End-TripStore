import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user/user.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  shoppingCart: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    const userId = localStorage.getItem('id');

    if (userId) {
      this.userService.getUser(userId).subscribe((user: any) => {
        this.shoppingCart = user.shoppingCart;
      });
    }
  }

  removeFromCart(item: any) {
    const userId = localStorage.getItem('id');

    if (userId) {
      this.userService.getUser(userId).subscribe((user: any) => {
        const updatedCart = user.shoppingCart.filter((product: any) => product.id !== item.id);
        const updatedUser = { ...user, shoppingCart: updatedCart };

        this.userService.updateUser(updatedUser).subscribe(() => {
          this.shoppingCart = updatedCart;
          console.log('Producto eliminado del carrito de compras del usuario');
        });
      });
    }
  }

  clearCart() {
    const userId = localStorage.getItem('id');

    if (userId) {
      this.userService.getUser(userId).subscribe((user: any) => {
        const updatedUser = { ...user, shoppingCart: [] };

        this.userService.updateUser(updatedUser).subscribe(() => {
          this.shoppingCart = [];
          console.log('Carrito de compras del usuario eliminado');
        });
      });
    }
  }
}

