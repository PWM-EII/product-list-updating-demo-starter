import { Injectable } from '@angular/core';
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    {
      id: 1, name: 'Product 1',
      price: 10, stock: 3
    },
    {
      id: 2, name: 'Product 2',
      price: 20, stock: 2
    },
    {
      id: 3, name: 'Product 3',
      price: 30, stock: 1
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product {
    const index = this.products.findIndex(p => p.id === id);
    return {...this.products[index]};
  }

  updateProduct(product: Product): void {
    const index = this.products.findIndex(p => p.id === product.id);
    this.products[index] = product;
  }

}
