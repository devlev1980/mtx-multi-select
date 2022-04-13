import { TestBed } from '@angular/core/testing';

import { MultiSelectLibService } from './multi-select-lib.service';

describe('MultiSelectLibService', () => {
  let service: MultiSelectLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiSelectLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
