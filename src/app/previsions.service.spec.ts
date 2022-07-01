import { TestBed } from '@angular/core/testing';

import { PrevisionsService } from './previsions.service';

describe('PrevisionsService', () => {
  let service: PrevisionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrevisionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
