import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDeleteDialogComponent } from './role-delete-dialog.component';

describe('RoleDeleteDialogComponent', () => {
  let component: RoleDeleteDialogComponent;
  let fixture: ComponentFixture<RoleDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleDeleteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
