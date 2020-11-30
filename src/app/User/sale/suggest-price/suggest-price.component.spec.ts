import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestPriceComponent } from './suggest-price.component';

describe('SuggestPriceComponent', () => {
  let component: SuggestPriceComponent;
  let fixture: ComponentFixture<SuggestPriceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestPriceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
