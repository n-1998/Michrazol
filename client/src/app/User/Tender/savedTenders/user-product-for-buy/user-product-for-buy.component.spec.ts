import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductForBuyComponent } from './user-product-for-buy.component';

describe('UserProductForBuyComponent', () => {
  let component: UserProductForBuyComponent;
  let fixture: ComponentFixture<UserProductForBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProductForBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProductForBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
