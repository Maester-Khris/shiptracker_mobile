import { TestBed } from '@angular/core/testing';

import { UIMessageService } from './uimessage.service';

describe('UIMessageService', () => {
  let service: UIMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UIMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
