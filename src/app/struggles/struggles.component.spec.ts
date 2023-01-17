import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrugglesComponent } from './struggles.component';

describe('StrugglesComponent', () => {
  let component: StrugglesComponent;
  let fixture: ComponentFixture<StrugglesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrugglesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrugglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
