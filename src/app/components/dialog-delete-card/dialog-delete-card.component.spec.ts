import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteCardComponent } from './dialog-delete-card.component';

describe('DialogDeleteCardComponent', () => {
  let component: DialogDeleteCardComponent;
  let fixture: ComponentFixture<DialogDeleteCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
