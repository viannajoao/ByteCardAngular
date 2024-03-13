import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/servico/client.service';
import { CadastroComponent } from '../cadastro/cadastro.component';
import { DialogClientComponent } from '../dialog-client/dialog-client.component';
import { DialodDeleteComponent } from '../dialod-delete/dialod-delete.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  client: Client = new Client();
  clients:Client[] = [];
  clientsFiltered: Client[] = [];
  clientSearch: string = "";
  displayedColumns = [ 'cpf' , 'name', 'email', 'tel', 'actions'];

  item: any;
  itemId: string = '';
  // termoPesquisa: any;

  constructor(private service:ClientService, private dialog:MatDialog){}

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

  pesquisar():void {
    console.log(this.clientsFiltered)
    this.clientsFiltered = this.clients.filter(usuario =>
      usuario.name.toLowerCase().includes(this.clientSearch.toLowerCase())
    );
  }


  openDialog(id:number){
    this.client = this.clients[id];
    const editClient = this.client
    console.log(editClient);
    const dialogRef =  this.dialog.open(DialogClientComponent, {
      width: '900px',
      data: {id: editClient.id ,cpf: editClient.cpf, name: editClient.name, email: editClient.email, tel: editClient.tel}
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  openDialogDelete(id:number){
    this.client = this.clients[id];
    const editClient = this.client
    console.log(editClient);
    const dialogRef =  this.dialog.open(DialodDeleteComponent, {
      width: '500px',
      data: {id: editClient.id ,cpf: editClient.cpf, name: editClient.name, email: editClient.email, tel: editClient.tel}
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  ngOnInit(): void {
    this.selecionar();
    console.log(this.clients)

  }

}



