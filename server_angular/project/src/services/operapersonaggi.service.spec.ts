import { TestBed } from '@angular/core/testing';

import { OperapersonaggiService } from './operapersonaggi.service';

describe('OperapersonaggiService', () => {
  let service: OperapersonaggiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperapersonaggiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
