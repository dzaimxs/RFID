import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysconfigDeleteDialogComponent } from './sysconfig-delete-dialog.component';

describe('SysconfigDeleteDialogComponent', () => {
  let component: SysconfigDeleteDialogComponent;
  let fixture: ComponentFixture<SysconfigDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SysconfigDeleteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysconfigDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
