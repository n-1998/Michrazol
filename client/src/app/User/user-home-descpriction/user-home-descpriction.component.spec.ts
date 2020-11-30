import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeDescprictionComponent } from './user-home-descpriction.component';

describe('UserHomeDescprictionComponent', () => {
  let component: UserHomeDescprictionComponent;
  let fixture: ComponentFixture<UserHomeDescprictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserHomeDescprictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserHomeDescprictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
