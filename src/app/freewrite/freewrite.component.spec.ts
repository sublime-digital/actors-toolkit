import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreewriteComponent } from './freewrite.component';

describe('FreewriteComponent', () => {
  let component: FreewriteComponent;
  let fixture: ComponentFixture<FreewriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreewriteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreewriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
