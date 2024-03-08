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

  constructor(private service:ClientService, private dialog: MatDialog, private router: Router){}

  selecionarCard():void{
    this.service.selecionarCartoes()
    .subscribe( retorno => {
      this.creditsPut = retorno
      this.creditsFiltered = this.creditsPut
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
    this.creditsFiltered = this.creditsPut.filter(usuario =>
      usuario.client.toLowerCase().includes(this.termoPesquisa.toLowerCase())
    );
  }

  openDialog(id:number){

    this.creditPut = this.creditsPut[id];
    const editCredit = this.creditPut
    console.log(this.item);
    const dialogRef =  this.dialog.open(DialogCardComponent, {
      width: '900px',
      data: {id: editCredit.id ,numCartao: editCredit.numCartao, validade: editCredit.validade, client: editCredit.client, cv: editCredit.cv, limity: editCredit.limity}
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  openDialogDelete(id:number){
    this.creditPut = this.creditsPut[id];
    const editCredit = this.creditPut
    console.log(editCredit);
    const dialogRef =  this.dialog.open(DialogDeleteCardComponent, {
      width: '500px',
      data: {id: editCredit.id , client: editCredit.client,}
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  // openDialogFatura(id:number){

  //   this.creditPut = this.creditsPut[id];
  //   const editCredit = this.creditPut
  //   console.log(this.item);
  //   const dialogRef =  this.dialog.open(FaturaComponent, {
  //     width: '1000px',
  //     data: {id: editCredit.id ,numCartao: editCredit.numCartao, validade: editCredit.validade, client: editCredit.client, cv: editCredit.cv, limity: editCredit.limity}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {

  //   })
  // }

  fatura(dados:number) {
    this.creditPut = this.creditsPut[dados];
    this.dadosSelect = this.creditPut;
    console.log(this.dadosSelect);
    this.router.navigate(['cartoes', 'faturas', this.dadosSelect.id]);

    // this.router.navigate({ path: 'cartoes/faturas/:id', component: this.dadosSelect })

    // this.router.navigate(['cartoes/faturas', component:this.dadosSelect.id]);
  }

  ngOnInit():void{

    this.selecionarCard();
    console.log(this.credits)
  }



}
