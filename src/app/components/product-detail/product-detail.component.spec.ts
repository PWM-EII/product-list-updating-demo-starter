import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ShoppingService } from '../../services/shopping.service';
import { ProductDetailComponent } from './product-detail.component';
import {FormsModule} from "@angular/forms";

describe('ProductDetailComponent', () => {

  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let mockActivatedRoute, mockRouter: { navigate: any; };
  let mockProductService: { getProductById: any; updateProduct: any; };
  let mockShoppingService: { getProductById: any; addProduct: any; updateProduct: any; };

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jest.fn().mockReturnValue('1')
        }
      }
    };
    mockRouter = {
      navigate: jest.fn()
    };
    mockProductService = {
      getProductById: jest.fn().mockReturnValue({
        id: 1,
        name: 'Product 1',
        price: 100,
        stock: 8
      }),
      updateProduct: jest.fn()
    };
    mockShoppingService = {
      getProductById: jest.fn().mockReturnValue(undefined),
      addProduct: jest.fn(),
      updateProduct: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      imports: [FormsModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: ProductService, useValue: mockProductService },
        { provide: ShoppingService, useValue: mockShoppingService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  test('should load product from productService', () => {
    expect(mockProductService.getProductById).toHaveBeenCalledWith(1);

    expect(component.product).toEqual({
      id: 1,
      name: 'Product 1',
      price: 100,
      stock: 8
    });
  });

  test('should update shopping and product list when onSubmit is called', () => {
    component.units = 5;

    component.onSubmit();

    expect(mockShoppingService.getProductById).toHaveBeenCalledWith(1);

    expect(mockShoppingService.addProduct).toHaveBeenCalledWith({
      id: 1,
      name: 'Product 1',
      price: 100,
      stock: 5
    });

    expect(mockProductService.updateProduct).toHaveBeenCalledWith({
      id: 1,
      name: 'Product 1',
      price: 100,
      stock: 3
    });

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/products/']);
  });

  test('should update shopping and product list when updating an product', () => {
    mockShoppingService.getProductById.mockReturnValue({
      id: 1,
      name: 'Product 1',
      price: 100,
      stock: 2
    });
    component.units = 3;

    component.onSubmit();

    expect(mockShoppingService.getProductById).toHaveBeenCalledWith(1);
    expect(mockShoppingService.updateProduct).toHaveBeenCalledWith({
      id: 1,
      name: 'Product 1',
      price: 100,
      stock: 5
    });
  });

});

