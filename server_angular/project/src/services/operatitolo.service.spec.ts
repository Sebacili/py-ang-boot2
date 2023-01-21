import { TestBed } from '@angular/core/testing';

import { OperatitoloService } from './operatitolo.service';

describe('OperatitoloService', () => {
  let service: OperatitoloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatitoloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
