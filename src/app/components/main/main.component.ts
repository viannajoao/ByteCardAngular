import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/servico/client.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  clients:Client[] = [];
  clientsFiltered: Client[] = [];
  clientSearch: string = "";
  displayedColumns = [ 'cpf' , 'name', 'email', 'tel'];

  constructor(private service:ClientService){}

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
    console.log(this.clientsFiltered)
    this.clientsFiltered = this.clients.filter(usuario =>
      usuario.name.toLowerCase().includes(this.clientSearch.toLowerCase())
    );
  }

  ngOnInit():void{
    this.selecionar();
    console.log(this.clients)
  }

}



