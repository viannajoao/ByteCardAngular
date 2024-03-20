import { Component, OnInit, } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/servico/client.service';
import { DialogClientComponent } from '../dialog-client/dialog-client.component';
import { DialodDeleteComponent } from '../dialod-delete/dialod-delete.component';
import { PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  client: Client = new Client();
  clients:Client[] = [];
  clientsFiltered: any[] = [];

  public items: Array<any> = [{
    cpf: this.client.cpf,
    name: this.client.name,
    email: this.client.email,
    tel: this.client.tel,
  }]

  public addClient: Array<any> = [
    {label: 'Adicionar Cliente', action: this.onAddClient.bind(this), icon: 'po-icon-user-add', color: 'yellow'},
  ]

  public actions: Array<PoTableAction> = [
    {label: 'Delete', action: this.openDialogDelete.bind(this)},
    {label: 'Editar', action: this.openDialog.bind(this)},
  ]

  readonly columns: Array<PoTableColumn> = [
    {property: 'cpf',label: 'CPF', },
    {property: 'name',label: 'NOME', },
    {property: 'email',label: 'E-MAIL', },
    {property: 'tel',label: 'TELEFONE', },
    // {property: 'this.actions' ,label: 'ACOES', }
  ]



  deleteItem(item: any) {
    console.log('Excluir item:', item);

  }



  clientSearch: string = "";

  pesquisar():void {
    console.log(this.clientsFiltered)
    console.log(this.clientSearch)
    this.clientsFiltered = this.items.filter(usuario =>
      usuario.name.toLowerCase().includes(this.clientSearch.toLowerCase())
    );
  }


  constructor(private service:ClientService, private dialog:MatDialog, private route: Router){}



  selecionar():void{
    this.service.selecionar()
    .subscribe((retorno) => {
      this.items = retorno;
      this.clientsFiltered = this.items;
    },
      (error) => {
        console.log(error);
      }
    )
  }




  openDialog(item: any){
    console.log(item)
    console.log(item.id)
    // this.client = this.clients[item.id];
    // console.log(this.client)
    const editClient = item
    console.log(editClient);
    const dialogRef =  this.dialog.open(DialogClientComponent, {
      width: '900px',
      height: '500px',
      data: {id: editClient.id ,cpf: editClient.cpf, name: editClient.name, email: editClient.email, tel: editClient.tel}
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  openDialogDelete(item:any){
    console.log(item)
    const editClient = item
    console.log(editClient);
    const dialogRef =  this.dialog.open(DialodDeleteComponent, {
      width: '500px',
      data: {id: editClient.id ,cpf: editClient.cpf, name: editClient.name, email: editClient.email, tel: editClient.tel}
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  onAddClient(){
    this.route.navigateByUrl('/main/cadastrar')
  }

  ngOnInit(): void {
    this.selecionar();
    console.log(this.clients)

  }







}



