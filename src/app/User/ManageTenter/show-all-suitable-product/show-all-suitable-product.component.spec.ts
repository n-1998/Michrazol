import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllSuitableProductComponent } from './show-all-suitable-product.component';

describe('ShowAllSuitableProductComponent', () => {
  let component: ShowAllSuitableProductComponent;
  let fixture: ComponentFixture<ShowAllSuitableProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllSuitableProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllSuitableProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
