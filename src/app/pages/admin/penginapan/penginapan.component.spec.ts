import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PenginapanComponent } from './penginapan.component';

describe('PenginapanComponent', () => {
  let component: PenginapanComponent;
  let fixture: ComponentFixture<PenginapanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PenginapanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PenginapanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
