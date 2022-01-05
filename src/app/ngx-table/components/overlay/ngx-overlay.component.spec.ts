import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxOverlayComponent } from './ngx-overlay.component';

describe('NgxOverlayComponent', () => {
  let component: NgxOverlayComponent;
  let fixture: ComponentFixture<NgxOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxOverlayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
