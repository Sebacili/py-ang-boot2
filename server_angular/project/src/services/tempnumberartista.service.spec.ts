import { TestBed } from '@angular/core/testing';

import { TempnumberartistaService } from './tempnumberartista.service';

describe('TempnumberartistaService', () => {
  let service: TempnumberartistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempnumberartistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
