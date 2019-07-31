import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedparComponent } from './medpar.component';

describe('MedparComponent', () => {
  let component: MedparComponent;
  let fixture: ComponentFixture<MedparComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedparComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedparComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
