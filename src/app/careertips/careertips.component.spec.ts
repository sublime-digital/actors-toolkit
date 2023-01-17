import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareertipsComponent } from './careertips.component';

describe('CareertipsComponent', () => {
  let component: CareertipsComponent;
  let fixture: ComponentFixture<CareertipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareertipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareertipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
