import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioGastoComponent } from './relatorio-gasto.component';

describe('RelatorioGastoComponent', () => {
  let component: RelatorioGastoComponent;
  let fixture: ComponentFixture<RelatorioGastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatorioGastoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioGastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
