import { TestBed } from '@angular/core/testing';

import { CreateMachineGuard } from './create-machine.guard';

describe('CreateMachineGuard', () => {
  let guard: CreateMachineGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CreateMachineGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
