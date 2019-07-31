import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerlombaanComponent } from './perlombaan.component';

describe('PerlombaanComponent', () => {
  let component: PerlombaanComponent;
  let fixture: ComponentFixture<PerlombaanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerlombaanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerlombaanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
