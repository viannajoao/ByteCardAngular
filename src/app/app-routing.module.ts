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
import { PoPageDynamicEditComponent } from '@po-ui/ng-templates';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  {
    path: 'main/cadastrar', canActivate: [AuthGuard],
    component: CadastroComponent
  },
  {
    path: 'main', canActivate: [AuthGuard],
    component: MainComponent,
  },
  {
    path: 'cartoes', canActivate: [AuthGuard],
    component: CartoesComponent
  },
  {
    path: 'cartoes/cadastrarCartao', canActivate: [AuthGuard],
    component: CadastroCartaoComponent
  },
  {
    path: 'cartoes/faturas/:id', canActivate: [AuthGuard],
    component: FaturaComponent
  },
  {
    path: 'compras', canActivate: [AuthGuard],
    component: ComprasComponent
  },
  {
    path: 'compras/cadastrarCompras', canActivate: [AuthGuard],
    component: ComprasCadastroComponent
  },
  {
    path: 'compras/relatorioGastos', canActivate: [AuthGuard],
    component: RelatorioGastoComponent
  },
  {
    path: 'relatorios', canActivate: [AuthGuard],
    component: RelatorioComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
