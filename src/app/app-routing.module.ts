import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { MainComponent } from './components/main/main.component';
import { CartoesComponent } from './components/cartoes/cartoes.component';
import { CadastroCartaoComponent } from './components/cadastro-cartao/cadastro-cartao.component';
import { FaturaComponent } from './components/fatura/fatura.component';
import { ComprasComponent } from './components/compras/compras.component';
import { ComprasCadastroComponent } from './components/compras-cadastro/compras-cadastro.component';
import { RelatorioGastoComponent } from './components/relatorio-gasto/relatorio-gasto.component';
import { RelatorioComponent } from './components/relatorio/relatorio.component';

const routes: Routes = [

  {
    path: 'cadastrar',
    component: CadastroComponent
  },
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'cartoes',
    component: CartoesComponent
  },
  {
    path: 'cartoes/cadastrarCartao',
    component: CadastroCartaoComponent
  },
  {
    path: 'cartoes/faturas/:id',
    component: FaturaComponent
  },
  {
    path: 'compras',
    component: ComprasComponent
  },
  {
    path: 'compras/cadastrarCompras',
    component: ComprasCadastroComponent
  },
  {
    path: 'compras/relatorioGastos',
    component: RelatorioGastoComponent
  },
  {
    path: 'relatorios',
    component: RelatorioComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
