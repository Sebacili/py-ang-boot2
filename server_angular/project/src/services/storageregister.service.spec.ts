import { TestBed } from '@angular/core/testing';

import { StorageregisterService } from './storageregister.service';

describe('StorageregisterService', () => {
  let service: StorageregisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageregisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
