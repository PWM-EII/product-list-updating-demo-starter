import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { ProductListComponent } from './product-list.component';
import {ShoppingListComponent} from "../shopping-list/shopping-list.component";
import {ProductDetailComponent} from "../product-detail/product-detail.component";

describe('ProductListComponent', () => {

  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent, ShoppingListComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', redirectTo: '/products', pathMatch: 'full' },
          { path: 'products', component: ProductListComponent },
          { path: 'products/:id', component: ProductDetailComponent },
        ])
      ],
      providers: [ProductService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    jest.spyOn(productService, 'getProducts').mockReturnValue(
      [
        {
          id: 1, name: 'Product 1',
          description: 'Description Product 1',
          price: 10, stock: 5
        },
        {
          id: 2, name: 'Product 2',
          description: 'Description Product 2',
          price: 20, stock: 10
        },
      ]
    );
    fixture.detectChanges();
  });


  test('should render product list', () => {
    const compiled = fixture.nativeElement;

    expect(compiled.querySelectorAll('td')[0].textContent).toContain('1');
    expect(compiled.querySelectorAll('td')[1].textContent).toContain('Product 1');
    expect(compiled.querySelectorAll('td')[2].textContent).toContain('10');
    expect(compiled.querySelectorAll('td')[3].textContent).toContain('5');
    expect(compiled.querySelectorAll('td')[4].textContent).toContain('Details');
    expect(compiled.querySelectorAll('td')[5].textContent).toContain('2');
    expect(compiled.querySelectorAll('td')[6].textContent).toContain('Product 2');
    expect(compiled.querySelectorAll('td')[7].textContent).toContain('20');
    expect(compiled.querySelectorAll('td')[8].textContent).toContain('10');
    expect(compiled.querySelectorAll('td')[9].textContent).toContain('Details');
  });

  test('should navigate to product detail page on button click', () => {
    const routerSpy =
      jest.spyOn(component['router'], 'navigate');
    const product: Product = {
      id: 1, name: 'Product 1',
      description: 'Description Product 1',
      price: 10, stock: 5
    };

    component.goToDetail(product);

    expect(routerSpy).toHaveBeenCalledWith(['/products/1']);

  });

  test('should update stock of product when onDeleteEvent is emitted', () => {

    const product: Product = {
      id: 1, name: 'Product 1',
      description: 'Description Product 1',
      price: 10, stock: 5
    };

    jest.spyOn(productService, 'getProductById').mockReturnValue(product);
    jest.spyOn(productService, 'updateProduct');
    jest.spyOn(productService, 'getProducts').mockReturnValue([]);


    component.onDeleteEvent(product);


    expect(productService.getProductById).toHaveBeenCalledWith(product.id);
    expect(product.stock).toEqual(10);
    expect(productService.updateProduct).toHaveBeenCalledWith(product);
    expect(productService.getProducts).toHaveBeenCalled();
  });

});
