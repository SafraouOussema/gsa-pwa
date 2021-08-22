import { TestBed } from '@angular/core/testing';

import { ScanedCodeService } from './scaned-code.service';

describe('ScanedCodeService', () => {
  let service: ScanedCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScanedCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
