import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { MainComponent } from './components/main/main.component';
import { CartoesComponent } from './components/cartoes/cartoes.component';
import { CadastroCartaoComponent } from './components/cadastro-cartao/cadastro-cartao.component';
import { FaturaComponent } from './components/fatura/fatura.component';

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
    path: 'cartoes/faturas',
    component: FaturaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
