import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllTendersComponent } from './show-all-tenders.component';

describe('ShowAllTendersComponent', () => {
  let component: ShowAllTendersComponent;
  let fixture: ComponentFixture<ShowAllTendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllTendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
