import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SekolahComponent } from './sekolah.component';

describe('SekolahComponent', () => {
  let component: SekolahComponent;
  let fixture: ComponentFixture<SekolahComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SekolahComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SekolahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
