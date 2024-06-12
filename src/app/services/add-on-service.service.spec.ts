import { TestBed } from '@angular/core/testing';

import { AddOnServiceService } from './add-on-service.service';

describe('AddOnServiceService', () => {
  let service: AddOnServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddOnServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
