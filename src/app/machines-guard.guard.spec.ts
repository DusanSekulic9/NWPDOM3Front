import { TestBed } from '@angular/core/testing';

import { MachinesGuardGuard } from './machines-guard.guard';

describe('MachinesGuardGuard', () => {
  let guard: MachinesGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MachinesGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
