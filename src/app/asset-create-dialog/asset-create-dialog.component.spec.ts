import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetCreateDialogComponent } from './asset-create-dialog.component';

describe('AssetCreateDialogComponent', () => {
  let component: AssetCreateDialogComponent;
  let fixture: ComponentFixture<AssetCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetCreateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssetCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
