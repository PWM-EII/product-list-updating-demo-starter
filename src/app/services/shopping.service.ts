import { Injectable } from '@angular/core';
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  products: Product[] = [];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    const index = this.products.findIndex(p => p.id === id);

    if(index === -1) return undefined;
    return {...this.products[index]};
  }

  addProduct(product: Product) {
    this.products.push(product);
  }

  updateProduct(product: Product): void {
    const index =
      this.products.findIndex(p => p.id === product.id);
    this.products[index] = product;
  }

  deleteProduct(product: Product): void {
    const index =
      this.products.findIndex(item => item.id === product.id);
    this.products.splice(index, 1);
  }
}
