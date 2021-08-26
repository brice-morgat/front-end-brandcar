import { TestBed } from '@angular/core/testing';

import { BrandcarsService } from './brandcars.service';

describe('BrandcarsService', () => {
  let service: BrandcarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandcarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
