import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDeleteDialogComponent } from './asset-delete-dialog.component';

describe('AssetDeleteDialogComponent', () => {
  let component: AssetDeleteDialogComponent;
  let fixture: ComponentFixture<AssetDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetDeleteDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
