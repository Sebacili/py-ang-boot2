import { TestBed } from '@angular/core/testing';

import { PrimservoperaService } from './primservopera.service';

describe('PrimservoperaService', () => {
  let service: PrimservoperaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimservoperaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
