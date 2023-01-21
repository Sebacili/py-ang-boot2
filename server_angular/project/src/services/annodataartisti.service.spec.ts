import { TestBed } from '@angular/core/testing';

import { AnnodataartistiService } from './annodataartisti.service';

describe('AnnodataartistiService', () => {
  let service: AnnodataartistiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnodataartistiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
