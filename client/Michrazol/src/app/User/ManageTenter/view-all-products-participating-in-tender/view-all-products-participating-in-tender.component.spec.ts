import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllProductsParticipatingInTenderComponent } from './view-all-products-participating-in-tender.component';

describe('ViewAllProductsParticipatingInTenderComponent', () => {
  let component: ViewAllProductsParticipatingInTenderComponent;
  let fixture: ComponentFixture<ViewAllProductsParticipatingInTenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllProductsParticipatingInTenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllProductsParticipatingInTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
