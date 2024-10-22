import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDisableDialogComponent } from './asset-disable-dialog.component';

describe('AssetDisableDialogComponent', () => {
  let component: AssetDisableDialogComponent;
  let fixture: ComponentFixture<AssetDisableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetDisableDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetDisableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
