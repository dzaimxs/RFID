import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCreateDialogComponent } from './device-create-dialog.component';

describe('DeviceCreateDialogComponent', () => {
  let component: DeviceCreateDialogComponent;
  let fixture: ComponentFixture<DeviceCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeviceCreateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeviceCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
