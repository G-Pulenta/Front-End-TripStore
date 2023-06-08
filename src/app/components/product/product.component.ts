import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../services/product/product.service";
import {UserService} from "../../services/user/user.service";
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';

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
  displayedColumns: string[] = ['name', 'imageUrl', 'description', 'price', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService, private userService: UserService, private router: Router) {
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
          this.categories = Array.from(new Set(this.products.map(product => product.category)));
        },
        error => {
          console.error('Error al cargar los productos:', error);
        }
      );
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

  addToCart(product: any) {
    this.userService.getUser(this.userId).subscribe((user: any) => {

      const shoppingCart = user.shoppingCart ? [...user.shoppingCart] : [];

      shoppingCart.push(product);

      const updatedUser = {...user, shoppingCart: shoppingCart};

      this.userService.updateUser(updatedUser).subscribe(() => {
        console.log('Producto agregado al carrito de compras del usuario');
      });
    });

  }
}
