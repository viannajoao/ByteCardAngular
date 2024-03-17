import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PoComboFilter, PoComboOption, PoComboOptionGroup } from '@po-ui/ng-components';
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

  clientsOptions: PoComboOption[] = [];
  // public readonly cartao: string = 'http://localhost:8080/cartoes';

  public cartao: Array<PoComboFilter> = [

  ]

  constructor(private servico:ClientService, private snackBar: MatSnackBar, private route: Router){}

  selecionar():void{
    this.servico.getClientsFiltered()
    .subscribe(retorno => {
      this.clients = retorno
      this.clientsOptions = this.clients.map(client => ({
        label: client.name, // Supondo que 'name' seja o nome do cliente
        value: client.id, // Supondo que 'id' seja o identificador único do cliente
      }));
      console.log(this.clientsOptions)
    } )

  }

  getClientById(clientSelect:any){
    console.log(clientSelect)
    this.servico.getItemById(clientSelect).subscribe(retorno => {
      this.selectClient = retorno
      console.log(this.selectClient)
    })
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

  cancel() {
    this.route.navigateByUrl('/cartoes')
  }

}


