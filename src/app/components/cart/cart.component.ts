import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user/user.service";
import {HttpClient} from "@angular/common/http";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  shoppingCart: any[] = [];

  constructor(private userService: UserService, private http: HttpClient) {}



  ngOnInit() {
    const cartId = localStorage.getItem('cartId');

    if (cartId) {
      this.http.get(`https://back-end-tripstore-production.up.railway.app/api/tripstore/v1/cart-items/shopping-carts/${cartId}`)
        .subscribe((response: Object) => {
          this.shoppingCart = response as any[];
        });
    }
  }

  removeFromCart(item: any) {
    const cartItemId = item.id; // Obtén el ID del item que deseas eliminar

    this.http.delete(`https://back-end-tripstore-production.up.railway.app/api/tripstore/v1/cart-items/${cartItemId}`)
      .subscribe(() => {
        // Eliminación exitosa, realiza las acciones necesarias (por ejemplo, actualizar la lista de compras)
        this.loadShoppingCart();
      }, (error) => {
        console.error('Error al eliminar el elemento del carrito:', error);
        this.loadShoppingCart();
        // Manejo de errores, muestra un mensaje de error o realiza acciones adicionales según sea necesario
      });


  }
  loadShoppingCart() {
    const cartId = localStorage.getItem('cartId');

    if (cartId) {
      this.http.get(`https://back-end-tripstore-production.up.railway.app/api/tripstore/v1/cart-items`)
        .subscribe((response: Object) => {
          this.shoppingCart = response as any[];
        });
    }
  }



  getTotalPrice() {
    let total = 0;
    this.shoppingCart.forEach((item: any) => {
      total += parseFloat(item.product.productPrice);
    });
    return total.toFixed(2);
  }
}

