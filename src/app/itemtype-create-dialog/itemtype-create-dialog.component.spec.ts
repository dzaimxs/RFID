import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemtypeCreateDialogComponent } from './itemtype-create-dialog.component';

describe('ItemtypeCreateDialogComponent', () => {
  let component: ItemtypeCreateDialogComponent;
  let fixture: ComponentFixture<ItemtypeCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemtypeCreateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemtypeCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
