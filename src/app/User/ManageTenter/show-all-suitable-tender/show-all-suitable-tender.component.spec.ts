import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllSuitableTenderComponent } from './show-all-suitable-tender.component';

describe('ShowAllSuitableTenderComponent', () => {
  let component: ShowAllSuitableTenderComponent;
  let fixture: ComponentFixture<ShowAllSuitableTenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllSuitableTenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllSuitableTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
