import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { Credito } from 'src/app/models/Credito';
import { ClientService } from 'src/app/servico/client.service';

@Component({
  selector: 'app-cartoes',
  templateUrl: './cartoes.component.html',
  styleUrls: ['./cartoes.component.css']
})
export class CartoesComponent implements OnInit {


  clients:Client[] = [];
  clientsFiltered: Client[] = [];
  termoPesquisa: string = "";
   displayedColumns = [ 'numero' , 'cliente', 'limite', 'validade'];

   credits:Credito[] = [];
   creditsFiltered:Credito[] = [];


  constructor(private service:ClientService){}

  selecionarCard():void{
    this.service.selecionarCartoes()
    .subscribe( retorno => {
      this.credits = retorno
      this.creditsFiltered = this.credits
    })
  }

  selecionar():void{
    this.service.selecionar()
    .subscribe((retorno) => {
      this.clients = retorno;
      this.clientsFiltered = this.clients;
    },
      (error) => {
        console.log(error);
      }
    )
  }


  pesquisar() {
    this.creditsFiltered = this.credits.filter(usuario =>
      usuario.client.toLowerCase().includes(this.termoPesquisa.toLowerCase())
    );
  }

  ngOnInit():void{
    this.selecionarCard();
    console.log(this.credits)
  }


}
