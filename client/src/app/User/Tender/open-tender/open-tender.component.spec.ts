import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CalendarModule} from 'primeng/calendar';
import { OpenTenderComponent } from './open-tender.component';

describe('OpenTenderComponent', () => {
  let component: OpenTenderComponent;
  let fixture: ComponentFixture<OpenTenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenTenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});