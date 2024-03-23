import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/models/Client';
import { Credito } from 'src/app/models/Credito';
import { ClientService } from 'src/app/servico/client.service';
import { DialogCardComponent } from '../dialog-card/dialog-card.component';
import { DialogDeleteCardComponent } from '../dialog-delete-card/dialog-delete-card.component';
import { CreditoPut } from 'src/app/models/CreditoPut';
import { Location } from '@angular/common';
import { FaturaComponent } from '../fatura/fatura.component';
import { Route, Router } from '@angular/router';
import { PoTableAction, PoTableColumn } from '@po-ui/ng-components';

@Component({
  selector: 'app-cartoes',
  templateUrl: './cartoes.component.html',
  styleUrls: ['./cartoes.component.css']
})
export class CartoesComponent implements OnInit {

  client:Client = new Client()
  credit: Credito = new Credito()
  clients:Client[] = [];
  clientsFiltered: Client[] = [];
  termoPesquisa: string = "";
  displayedColumns = [ 'numero' , 'cliente', 'limite', 'validade', 'actions'];

   credits:Credito[] = [];
   creditsFiltered:CreditoPut[] = [];
    item: CreditoPut = new CreditoPut();

  creditPut: CreditoPut = new CreditoPut();
  creditsPut: CreditoPut[] = [];

  dadosSelect: CreditoPut = new CreditoPut();

  public addCredit: Array<any> = [
    {label: 'Adicionar Cartao', action: this.onAddCredit.bind(this), icon: 'po-icon-user-add', color: 'yellow'},
  ]

  pesquisar() {
    console.log(this.creditsFiltered)
    console.log(this.termoPesquisa)
    this.creditsFiltered = this.items.filter(usuario =>
      usuario.client.toLowerCase().includes(this.termoPesquisa.toLowerCase())
    );
  }


  readonly columns: Array<PoTableColumn> = [
    {property: 'numCartao',label: 'CARTAO', },
    {property: 'client',label: 'CLIENTE', },
    {property: 'limity',label: 'LIMITE', },
    {property: 'validade',label: 'VALIDADE', },
    // {property: 'this.actions' ,label: 'ACOES', }
  ]

  public actions: Array<PoTableAction> = [
    {label: 'Delete', action: this.openDialogDelete.bind(this)},
    {label: 'Editar', action: this.openDialog.bind(this)},
    {label: 'Fatura', action: this.fatura.bind(this)},
  ]

  public items: Array<any> = [{
    numCartao: this.creditPut.numCartao,
    client: this.creditPut.client,
    limity: this.creditPut.limity,
    validade: this.creditPut.validade,
  }]

  constructor(private service:ClientService, private dialog: MatDialog, private router: Router){}

  selecionarCard():void{
    this.service.selecionarCartoes()
    .subscribe( retorno => {
      this.items = retorno
      this.creditsFiltered = this.items
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




  openDialog(item:any){
    console.log(item);
    this.creditPut = item
    const editCredit = this.creditPut
    // console.log(this.item);
    const dialogRef =  this.dialog.open(DialogCardComponent, {
      width: '900px',
      data: {id: editCredit.id ,numCartao: editCredit.numCartao, validade: editCredit.validade, client: editCredit.client, cv: editCredit.cv, limity: editCredit.limity}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selecionarCard()
    })
  }

  openDialogDelete(item:any){

    this.creditPut = item
    const editCredit = this.creditPut
    console.log(editCredit);
    const dialogRef =  this.dialog.open(DialogDeleteCardComponent, {
      width: '500px',
      data: {id: editCredit.id , client: editCredit.client,}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.selecionarCard()
    })
  }

  fatura(item:any) {
    // this.creditPut = this.creditsPut[dados];
    this.dadosSelect = item.id;;
    console.log(this.dadosSelect);
    this.router.navigate(['cartoes', 'faturas', this.dadosSelect]);

  }

  onAddCredit(){
    this.router.navigateByUrl('/cartoes/cadastrarCartao')
  }

  ngOnInit():void{

    this.selecionarCard();
    console.log(this.credits)
  }



}
