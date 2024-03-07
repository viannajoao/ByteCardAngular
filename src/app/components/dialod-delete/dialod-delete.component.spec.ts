import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialodDeleteComponent } from './dialod-delete.component';

describe('DialodDeleteComponent', () => {
  let component: DialodDeleteComponent;
  let fixture: ComponentFixture<DialodDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialodDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialodDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
