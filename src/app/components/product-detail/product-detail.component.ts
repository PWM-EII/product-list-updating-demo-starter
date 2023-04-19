import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from "../../models/product.model";
import {ProductService} from "../../services/product.service";
import {ShoppingService} from "../../services/shopping.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Product = { id: 0, name: '', description: '', price: 0, stock: 0 };
  units = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private shoppingService: ShoppingService,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

  }

  onSubmit() {

    this.router.navigate([`/products/`]);
  }

}
