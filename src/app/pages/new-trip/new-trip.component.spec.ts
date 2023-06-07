import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTripComponent } from './new-trip.component';

describe('NewTripComponent', () => {
  let component: NewTripComponent;
  let fixture: ComponentFixture<NewTripComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTripComponent]
    });
    fixture = TestBed.createComponent(NewTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
