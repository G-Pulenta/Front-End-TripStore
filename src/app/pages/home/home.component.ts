import {Component, OnInit} from '@angular/core';
import {map, Observable, of, switchMap, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
interface ShoppingCart {
  id: any;
  cartDateCreated: string;
  cartStatus: string;
  user: {
    id: any;
    username: string;
    password: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
  };
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(
    private http: HttpClient) {
  }
  shoppingCart: any[] = [];
  ngOnInit() {
    const userId = localStorage.getItem('id');
    if (userId) {
      this.createCart(userId).subscribe((cart: any) => {
        console.log('Carrito creado exitosamente');
        this.shoppingCart = cart; // Guardar el carrito creado en la variable de clase
      }, (error) => {
        console.error('Error al crear el carrito:', error);

      });
    } else {
      console.error('No se encontró un ID de usuario válido');
    }
  }
  checkExistingCart(userId: string): Observable<boolean> {
    const url = `https://back-end-tripstore-production.up.railway.app/api/tripstore/v1/shopping-carts`;
    return this.http.get<any[]>(url).pipe(
      map((carts: any[]) => {
        return carts.some(cart => cart.user && cart.user.id === userId);
      })
    );
  }

  createCart(userId: string): Observable<any> {
    const createUrl = 'https://back-end-tripstore-production.up.railway.app/api/tripstore/v1/shopping-carts';
    const getAllUrl = 'https://back-end-tripstore-production.up.railway.app/api/tripstore/v1/shopping-carts';
    const currentDate = new Date().toISOString();
    const cartData = {
      cartDateCreated: currentDate,
      cartStatus: 'In Progress',
      user: {
        id: parseInt(userId)
      }
    };


    return this.http.get<ShoppingCart[]>(getAllUrl).pipe(
      switchMap((response) => {
        const matchingCart = response.find((cart) => cart.user.id === parseInt(userId, 10));
        console.log('matchingCart:', matchingCart);
        if (matchingCart) {
          localStorage.setItem('cartId', matchingCart.id.toString()); // Save the matching shopping cart ID to local storage
          return of(matchingCart);
        } else {
          return this.http.post<any>(createUrl, cartData).pipe(
            tap((response) => {
              const cartId = response.id;
              localStorage.setItem('cartId', cartId.toString()); // Save the shopping cart ID to local storage
            })
          );
        }
      })
    );
  }

}
