import { TestBed } from '@angular/core/testing';

import { ElencoopereService } from './elencoopere.service';

describe('ElencoopereService', () => {
  let service: ElencoopereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElencoopereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
