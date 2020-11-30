import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionPriceDitailsComponent } from './suggestion-price-ditails.component';

describe('SuggestionPriceDitailsComponent', () => {
  let component: SuggestionPriceDitailsComponent;
  let fixture: ComponentFixture<SuggestionPriceDitailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionPriceDitailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionPriceDitailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
