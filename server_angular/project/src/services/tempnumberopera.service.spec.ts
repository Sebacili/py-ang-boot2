import { TestBed } from '@angular/core/testing';

import { TempnumberoperaService } from './tempnumberopera.service';

describe('TempnumberoperaService', () => {
  let service: TempnumberoperaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempnumberoperaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
