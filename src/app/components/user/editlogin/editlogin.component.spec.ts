import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditloginComponent } from './editlogin.component';

describe('EditloginComponent', () => {
  let component: EditloginComponent;
  let fixture: ComponentFixture<EditloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditloginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
