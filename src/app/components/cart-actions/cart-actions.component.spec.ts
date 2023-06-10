import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartActionsComponent } from './cart-actions.component';

describe('CartActionsComponent', () => {
  let component: CartActionsComponent;
  let fixture: ComponentFixture<CartActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartActionsComponent]
    });
    fixture = TestBed.createComponent(CartActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
