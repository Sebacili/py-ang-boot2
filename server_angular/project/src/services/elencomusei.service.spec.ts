import { TestBed } from '@angular/core/testing';

import { ElencomuseiService } from './elencomusei.service';

describe('ElencomuseiService', () => {
  let service: ElencomuseiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElencomuseiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
