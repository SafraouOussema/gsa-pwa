import { TestBed } from '@angular/core/testing';

import { DesinectisationService } from './desinectisation.service';

describe('DesinectisationService', () => {
  let service: DesinectisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DesinectisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
