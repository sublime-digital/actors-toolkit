import { TestBed } from '@angular/core/testing';

import { ActingGigsService } from './acting-gigs.service';

describe('ActingGigsService', () => {
  let service: ActingGigsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActingGigsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
