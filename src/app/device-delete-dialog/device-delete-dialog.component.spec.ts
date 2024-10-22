import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDeleteDialogComponent } from './device-delete-dialog.component';

describe('DeviceDeleteDialogComponent', () => {
  let component: DeviceDeleteDialogComponent;
  let fixture: ComponentFixture<DeviceDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceDeleteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
