import { TestBed } from '@angular/core/testing';

import { ElencopersonaggiService } from './elencopersonaggi.service';

describe('ElencopersonaggiService', () => {
  let service: ElencopersonaggiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElencopersonaggiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
