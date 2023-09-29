import { TestBed } from '@angular/core/testing';

import { MosqueesService } from './mosquees.service';

describe('MosqueesService', () => {
  let service: MosqueesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MosqueesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
