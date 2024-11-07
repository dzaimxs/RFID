import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockAccountDialogComponent } from './unlock-account-dialog.component';

describe('UnlockAccountDialogComponent', () => {
  let component: UnlockAccountDialogComponent;
  let fixture: ComponentFixture<UnlockAccountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnlockAccountDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnlockAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
