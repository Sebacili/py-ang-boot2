import { TestBed } from '@angular/core/testing';

import { personaggiService } from './personaggi.service';

describe('personaggiService', () => {
    let service: personaggiService;
  
    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(personaggiService);
    });
  
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });