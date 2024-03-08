import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasRelatorioComponent } from './compras-relatorio.component';

describe('ComprasRelatorioComponent', () => {
  let component: ComprasRelatorioComponent;
  let fixture: ComponentFixture<ComprasRelatorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprasRelatorioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprasRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
