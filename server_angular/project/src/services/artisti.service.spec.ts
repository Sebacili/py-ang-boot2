import { TestBed } from '@angular/core/testing';

import { ArtistiService } from './artisti.service';

describe('ArtistiService', () => {
  let service: ArtistiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
