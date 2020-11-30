import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTenderDetailsComponent } from './edit-tender-details.component';

describe('EditTenderDetailsComponent', () => {
  let component: EditTenderDetailsComponent;
  let fixture: ComponentFixture<EditTenderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTenderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTenderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
