import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSuitableProductsComponent } from './choose-suitable-products.component';

describe('ChooseSuitableProductsComponent', () => {
  let component: ChooseSuitableProductsComponent;
  let fixture: ComponentFixture<ChooseSuitableProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseSuitableProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseSuitableProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
