import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getProducts() {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getProduct(productId: string) {
    return this.http.get(`${this.apiUrl}/products/${productId}`);
  }

  createProduct(product: any) {
    return this.http.post(`${this.apiUrl}/products`, product);
  }

  updateProduct(product: any) {
    return this.http.put(`${this.apiUrl}/products/${product.id}`, product);
  }

  deleteProduct(productId: string) {
    return this.http.delete(`${this.apiUrl}/products/${productId}`);
  }
}
