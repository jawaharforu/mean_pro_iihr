import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductnameComponent } from './productname.component';

describe('ProductnameComponent', () => {
  let component: ProductnameComponent;
  let fixture: ComponentFixture<ProductnameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductnameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductnameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
