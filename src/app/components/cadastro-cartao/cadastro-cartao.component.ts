import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/app/models/Client';
import { Credito } from 'src/app/models/Credito';
import { ClientService } from 'src/app/servico/client.service';

@Component({
  selector: 'app-cadastro-cartao',
  templateUrl: './cadastro-cartao.component.html',
  styleUrls: ['./cadastro-cartao.component.css']
})
export class CadastroCartaoComponent implements OnInit {

  client = new Client();
  credit = new Credito();
  selectClient: Client = new Client();

  clients:Client[] = [];
  credits:Credito[] = [];

  clientSelect: string = '';

  constructor(private servico:ClientService, private snackBar: MatSnackBar){}

  selecionar():void{
    this.servico.selecionarClientes()
    .subscribe(retorno => this.clients = retorno)
  }

  cadastrar():void{
    console.log(this.selectClient)
    this.credit.clients_id = this.selectClient
    this.credit.client = this.selectClient.name
    if(this.credit.limity && this.credit.client != ''){

    this.credit.limity.toString()
    this.servico.cadastrarCard(this.credit).subscribe(retorno => {
      this.credits.push(retorno)
      this.onSucess();
      console.log(retorno)
      this.credit = new Credito()
    }, err => {
      this.onError();
    })
  }else{
    this.onLimity()
  }
  console.log(this.client.name)
    console.log(this.credit)
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

  onLimity():void{
    this.snackBar.open("Preencha o campo limite para proceguir corretamente", '', {
      duration: 3000
    })
  }


  ngOnInit() {
    this.selecionar()
    console.log(this.clients)
  }

}


