import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingService } from '../../services/shopping.service';
import { Product } from '../../models/product.model';

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListComponent ],
      imports: [ RouterTestingModule ],
      providers: [ ShoppingService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should calculate total correctly', () => {
    const shoppingService = TestBed.inject(ShoppingService);
    const products: Product[] = [
      { id: 1, name: 'Product 1', description: 'Description 1', price: 10, stock: 2 },
      { id: 2, name: 'Product 2', description: 'Description 2', price: 15, stock: 3 },
      { id: 3, name: 'Product 3', description: 'Description 3', price: 20, stock: 4 }
    ];

    shoppingService.products = products;
    component.ngOnInit();

    expect(component.total).toEqual(2*10 + 3*15 + 4*20);
  });


  test('should display a message when the shopping list is empty', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Empty list');
  });

  test('should display products correctly', () => {
    const shoppingService = TestBed.inject(ShoppingService);
    const products: Product[] = [
      { id: 1, name: 'Product 1', description: 'Description 1', price: 10, stock: 2 },
      { id: 2, name: 'Product 2', description: 'Description 2', price: 15, stock: 3 },
    ];

    shoppingService.products = products;
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;

    expect(compiled.querySelectorAll('td')[0].textContent).toContain('1');
    expect(compiled.querySelectorAll('td')[1].textContent).toContain('Product 1');
    expect(compiled.querySelectorAll('td')[2].textContent).toContain('10');
    expect(compiled.querySelectorAll('td')[3].textContent).toContain('2');
    expect(compiled.querySelectorAll('td')[4].textContent).toContain('Delete');
    expect(compiled.querySelectorAll('td')[5].textContent).toContain('2');
    expect(compiled.querySelectorAll('td')[6].textContent).toContain('Product 2');
    expect(compiled.querySelectorAll('td')[7].textContent).toContain('15');
    expect(compiled.querySelectorAll('td')[8].textContent).toContain('3');
    expect(compiled.querySelectorAll('td')[9].textContent).toContain('Delete');
  });


  test('should delete a product', () => {
    const shoppingService = TestBed.inject(ShoppingService);
    jest.spyOn(component.deleteEvent, 'emit');
    const deleteSpy =
      jest.spyOn(shoppingService, 'deleteProduct');

    const product: Product = {
      id: 1, name: 'Product 1',
      description: 'Description 1',
      price: 10, stock: 1
    };

    // set the products
    shoppingService.products = [product];
    component.ngOnInit();

    component.delete(product);

    // check that the product was deleted
    expect(shoppingService.getProducts().length).toEqual(0);

    // check that the delete event was emitted
    expect(component.deleteEvent.emit).toHaveBeenCalledWith(product);

    // check that the total was updated
    expect(component.total).toEqual(0);

    // check that the deleteProduct method was called on the shopping service
    expect(deleteSpy).toHaveBeenCalledWith(product);
  });

});
