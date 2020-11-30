import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLastTendersComponent } from './show-last-tenders.component';

describe('ShowLastTendersComponent', () => {
  let component: ShowLastTendersComponent;
  let fixture: ComponentFixture<ShowLastTendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowLastTendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLastTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
