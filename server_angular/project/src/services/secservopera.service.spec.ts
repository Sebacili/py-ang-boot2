import { TestBed } from '@angular/core/testing';

import { SecservoperaService } from './secservopera.service';

describe('SecservoperaService', () => {
  let service: SecservoperaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecservoperaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
