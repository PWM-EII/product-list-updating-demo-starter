import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product} from "../../models/product.model";
import {ShoppingService} from "../../services/shopping.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  @Output()
  deleteEvent = new EventEmitter<Product>;

  products: Product[] = [];
  total = 0;

  constructor(private shoppingService: ShoppingService) {}

  ngOnInit(): void {

  }

  delete(product: Product) {

  }

}
