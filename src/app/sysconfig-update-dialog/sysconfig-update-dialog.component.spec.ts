import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysconfigUpdateDialogComponent } from './sysconfig-update-dialog.component';

describe('SysconfigUpdateDialogComponent', () => {
  let component: SysconfigUpdateDialogComponent;
  let fixture: ComponentFixture<SysconfigUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SysconfigUpdateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysconfigUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
