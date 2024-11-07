import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotDialogComponent } from './robot-dialog.component';

describe('RobotDialogComponent', () => {
  let component: RobotDialogComponent;
  let fixture: ComponentFixture<RobotDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
