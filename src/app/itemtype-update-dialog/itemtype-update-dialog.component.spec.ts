import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemtypeUpdateDialogComponent } from './itemtype-update-dialog.component';

describe('ItemtypeUpdateDialogComponent', () => {
  let component: ItemtypeUpdateDialogComponent;
  let fixture: ComponentFixture<ItemtypeUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemtypeUpdateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemtypeUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
