import { TestBed } from '@angular/core/testing';

import { LocauxService } from './locaux.service';

describe('LocauxService', () => {
  let service: LocauxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocauxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
