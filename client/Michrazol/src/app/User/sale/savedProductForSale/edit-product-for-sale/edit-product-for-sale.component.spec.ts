import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductForSaleComponent } from './edit-product-for-sale.component';

describe('EditProductForSaleComponent', () => {
  let component: EditProductForSaleComponent;
  let fixture: ComponentFixture<EditProductForSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductForSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
