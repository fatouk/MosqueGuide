import { TestBed } from '@angular/core/testing';

import { GeolocaliserService } from './geolocaliser.service';

describe('GeolocaliserService', () => {
  let service: GeolocaliserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeolocaliserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
