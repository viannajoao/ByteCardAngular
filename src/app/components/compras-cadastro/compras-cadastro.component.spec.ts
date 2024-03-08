import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasCadastroComponent } from './compras-cadastro.component';

describe('ComprasCadastroComponent', () => {
  let component: ComprasCadastroComponent;
  let fixture: ComponentFixture<ComprasCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprasCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprasCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
