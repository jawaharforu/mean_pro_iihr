import { TestBed, inject } from '@angular/core/testing';

import { ProductdetailService } from './productdetail.service';

describe('ProductdetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductdetailService]
    });
  });

  it('should be created', inject([ProductdetailService], (service: ProductdetailService) => {
    expect(service).toBeTruthy();
  }));
});
