import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Client } from 'src/app/models/Client';
import { Credito } from 'src/app/models/Credito';
import { ClientService } from 'src/app/servico/client.service';
import { DialogCardComponent } from '../dialog-card/dialog-card.component';
import { DialogDeleteCardComponent } from '../dialog-delete-card/dialog-delete-card.component';

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
   creditsFiltered:Credito[] = [];


  constructor(private service:ClientService, private dialog: MatDialog){}

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

  openDialog(id:number){
    this.credit = this.credits[id];
    const editCredit = this.credit
    console.log(editCredit);
    const dialogRef =  this.dialog.open(DialogCardComponent, {
      width: '900px',
      data: {id: editCredit.id ,numCartao: editCredit.numCartao, validade: editCredit.validade, client: editCredit.client, cv: editCredit.cv}
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  openDialogDelete(id:number){
    this.credit = this.credits[id];
    const editCredit = this.credit
    console.log(editCredit);
    const dialogRef =  this.dialog.open(DialogDeleteCardComponent, {
      width: '500px',
      data: {id: editCredit.id ,numCartao: editCredit.numCartao, validade: editCredit.validade, client: editCredit.client, cv: editCredit.cv}
    });

    dialogRef.afterClosed().subscribe(result => {

    })
  }

  ngOnInit():void{
    this.selecionarCard();
    console.log(this.credits)
  }


}
