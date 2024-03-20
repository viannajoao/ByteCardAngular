import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';
import { MatDialog } from '@angular/material/dialog';
import { StyleButtonComponent } from './components/style-button/style-button.component';
import { AuthService } from './servico/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 constructor( private router: Router, private dialog: MatDialog, public authService: AuthService, private snackBar: MatSnackBar){}

  readonly menus: Array<PoMenuItem> = [
    { label: 'Clientes', subItems: [
      {label: 'Listas de Clientes', link: '/'},
      {label: 'Cadastrar Clientes', link: '/main/cadastrar'}
    ]},
    { label: 'Cartoes', subItems: [
      {label: 'Listas de Cartoes', link: '/cartoes'},
      {label: 'Cadastrar Cartao', link: '/cartoes/cadastrarCartao'}
    ]},
    { label: 'Compras', subItems: [
      {label: 'Cadastrar Compras', link: '/compras/cadastrarCompras'},
      {label: 'Relatorio de gastos', link: '/compras/relatorioGastos'}
    ]},
    { label: 'Relatorios', action: this.onRelatorios.bind(this)},
    { label: 'Logout', action: this.onLogout.bind(this)},
  ];

  private onHome() {
    this.router.navigate(['/'])
  }

  private onCartoes(){
    this.router.navigate(['/cartoes']);
  }

  private onCompras(){
    const dialogRef = this.dialog.open(StyleButtonComponent,{
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(result => {

    })
  }

  private onRelatorios(){
    this.router.navigate(['/relatorios']);
  }

  private onLogout(){
    this.snackBar.open("Logout feito com sucesso", ""  , {duration:2000});
    localStorage.removeItem('token');
  }

}
