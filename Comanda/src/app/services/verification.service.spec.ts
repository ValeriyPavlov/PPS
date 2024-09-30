/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VerificationService } from './verification.service';

describe('Service: Verification', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerificationService]
    });
  });

  it('should ...', inject([VerificationService], (service: VerificationService) => {
    expect(service).toBeTruthy();
  }));
});
