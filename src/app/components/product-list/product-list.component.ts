import {Component, NgZone, OnInit} from '@angular/core';
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/product.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private zone: NgZone,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  goToDetail(product: Product): void {
    // Navigate to the product detail page
    this.zone.run(() => {
      this.router.navigate([`/products/${product.id}`]);
    });
  }

  onDeleteEvent(product: Product) {

  }
}
