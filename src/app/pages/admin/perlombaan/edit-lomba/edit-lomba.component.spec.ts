import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLombaComponent } from './edit-lomba.component';

describe('EditLombaComponent', () => {
  let component: EditLombaComponent;
  let fixture: ComponentFixture<EditLombaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLombaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLombaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
