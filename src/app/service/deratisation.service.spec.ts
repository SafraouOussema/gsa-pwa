import { TestBed } from '@angular/core/testing';

import { DeratisationService } from './deratisation.service';

describe('DeratisationService', () => {
  let service: DeratisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeratisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
