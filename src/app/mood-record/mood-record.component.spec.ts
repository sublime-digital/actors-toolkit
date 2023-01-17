import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodRecordComponent } from './mood-record.component';

describe('MoodRecordComponent', () => {
  let component: MoodRecordComponent;
  let fixture: ComponentFixture<MoodRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
