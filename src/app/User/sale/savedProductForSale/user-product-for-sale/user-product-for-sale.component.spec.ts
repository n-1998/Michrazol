import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductForSaleComponent } from './user-product-for-sale.component';

describe('UserProductForSaleComponent', () => {
  let component: UserProductForSaleComponent;
  let fixture: ComponentFixture<UserProductForSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProductForSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProductForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
