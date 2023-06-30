import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {UserService} from "../../services/user/user.service";
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
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
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, AfterViewInit {
  userId: string;
  products: any[] = [];
  categories: string[] = [];
  shoppingCart: any[] = [];
  displayedColumns: string[] = ['productName', 'productImage', 'productDescription', 'productPrice', 'productRating', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isSmallScreen$: Observable<boolean> | undefined;
  constructor(
    private productService: ProductService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private http: HttpClient
  ) {
    this.userId = localStorage.getItem('id') || '';
    console.log('userId:', this.userId)
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit() {
    this.loadProducts();
    this.isSmallScreen$ = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait]).pipe(
      map((result) => result.matches)
    );
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

  loadProducts() {
    this.productService.getProducts()
      .subscribe(
        (response: Object) => { // Update the type annotation to Object
          this.products = Object.values(response);
          this.dataSource = new MatTableDataSource(this.products);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;

          // Extract unique categories from the products
          this.categories = Array.from(new Set(this.products.map(product => product.productCategory)));
        },
        error => {
          console.error('Error al cargar los productos:', error);
        }
      );
  }
  getRatingStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterByCategory(category: string) {
    this.dataSource.filter = category.trim().toLowerCase();
  }

  resetFilter() {
    this.dataSource.filter = '';
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
  addToCart(product: any) {
    const userId = localStorage.getItem('id');
    const cartId = localStorage.getItem('cartId');
    if (userId) {
      this.checkExistingCart(userId).subscribe((cartExists: boolean) => {
            const cartItemData = {
              subtotal: product.productPrice,
              quantity: 1,
              product: {
                id: product.id
              },
              shoppingCart: {
                id: cartId
              }
            };
            const url = 'https://back-end-tripstore-production.up.railway.app/api/tripstore/v1/cart-items';
            this.http.post<any>(url, cartItemData).subscribe(() => {
              this.snackBar.open('Producto agregado al carrito de compras', 'Cerrar', {
                duration: 3000
              });
            }, (error) => {
              console.error('Error al agregar el producto al carrito:', error);
            });


      }, (error) => {
        console.error('Error al verificar el carrito existente:', error);
      });
    } else {
      console.error('No se encontró un ID de usuario válido');
    }
  }
}
