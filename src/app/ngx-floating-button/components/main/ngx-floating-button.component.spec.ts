import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFloatingButtonComponent } from './ngx-floating-button.component';

describe('NgxFloatingButtonComponent', () => {
  let component: NgxFloatingButtonComponent;
  let fixture: ComponentFixture<NgxFloatingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxFloatingButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFloatingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
