import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';

import { PoMenuItem } from '@po-ui/ng-components';
import { MatDialog } from '@angular/material/dialog';
import { StyleButtonComponent } from './components/style-button/style-button.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 constructor( private router: Router, private dialog: MatDialog){}

  readonly menus: Array<PoMenuItem> = [
    { label: 'Clientes', action: this.onHome.bind(this)},
    { label: 'Cartoes', action: this.onCartoes.bind(this)},
    { label: 'Compras', action: this.onCompras.bind(this)},
    { label: 'Relatorios', action: this.onRelatorios.bind(this)},
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

}
