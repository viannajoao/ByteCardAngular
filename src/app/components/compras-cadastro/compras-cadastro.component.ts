import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/app/models/Client';
import { Compras } from 'src/app/models/Compras';
import { CreditoPut } from 'src/app/models/CreditoPut';
import { ClientService } from 'src/app/servico/client.service';

@Component({
  selector: 'app-compras-cadastro',
  templateUrl: './compras-cadastro.component.html',
  styleUrls: ['./compras-cadastro.component.css']
})
export class ComprasCadastroComponent implements OnInit {

  clients:Client[] = [];
  creditsPut:CreditoPut[] = [];
  buy:Compras = new Compras();
  buys:Compras[] = [];

  constructor(private service:ClientService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.selecionar();
    console.log(this.creditsPut)
  }

  selecionar():void{
    this.service.selecionarCartoes()
    .subscribe(retorno => this.creditsPut = retorno)
  }

  cadastrar():void{
    this.service.cadastrarBuy(this.buy).subscribe(retorno => {
      this.buys.push(retorno)
      this.onSucess();
      this.buy = new Compras();
    }, err => {
      this.onError();
    })
  }

  onSucess():void{
    this.snackBar.open("Cartao cadastrado com sucesso", '', {
      duration: 3000
    })
  }

  onError():void{
    this.snackBar.open("Erro ao cadastrar", '', {
      duration: 3000
    })
  }

}
