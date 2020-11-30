import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseTenderComponent } from './close-tender.component';

describe('CloseTenderComponent', () => {
  let component: CloseTenderComponent;
  let fixture: ComponentFixture<CloseTenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseTenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
