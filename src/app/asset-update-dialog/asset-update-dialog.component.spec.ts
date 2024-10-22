import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetUpdateDialogComponent } from './asset-update-dialog.component';

describe('AssetUpdateDialogComponent', () => {
  let component: AssetUpdateDialogComponent;
  let fixture: ComponentFixture<AssetUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetUpdateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
