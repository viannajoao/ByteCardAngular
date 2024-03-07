import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCardComponent } from './dialog-card.component';

describe('DialogCardComponent', () => {
  let component: DialogCardComponent;
  let fixture: ComponentFixture<DialogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
