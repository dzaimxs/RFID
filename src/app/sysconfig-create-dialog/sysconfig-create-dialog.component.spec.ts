import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysconfigCreateDialogComponent } from './sysconfig-create-dialog.component';

describe('SysconfigCreateDialogComponent', () => {
  let component: SysconfigCreateDialogComponent;
  let fixture: ComponentFixture<SysconfigCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SysconfigCreateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SysconfigCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
