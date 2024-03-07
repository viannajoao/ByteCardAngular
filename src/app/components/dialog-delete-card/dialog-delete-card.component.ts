import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/app/models/Client';
import { Credito } from 'src/app/models/Credito';
import { ClientService } from 'src/app/servico/client.service';

import { Injectable } from '@angular/core';


@Component({
  selector: 'app-dialog-delete-card',
  templateUrl: './dialog-delete-card.component.html',
  styleUrls: ['./dialog-delete-card.component.css']
})
export class DialogDeleteCardComponent implements OnInit {

  client: Client = new Client()
  clients: Client[] = [];
  item: Credito = new Credito();
  itemId: string = '';

  constructor(private dialog: MatDialogRef<DialogDeleteCardComponent>, private service: ClientService, @Inject(MAT_DIALOG_DATA) public data: Client, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.itemId = this.data.id; // Substitua pelo ID do item que você deseja atualizar
    this.service.getCreditById(this.itemId).subscribe(result => {
      this.item = result;
      console.log(this.item)
    });
    console.log(this.item)
    // console.log(this.itemId)
  }

  deleteItem(): void {
    console.log(this.item)
    this.service.deleteCreditItem(this.item).subscribe(result => {
      console.log(result)
      this.onSucess()
      this.cancel()
    //   setTimeout(() => {

    //     this.refresh()


    // }, 3000)
  }
  )}

  onSucess():void{
    this.snackBar.open("Cartão deletado com sucesso", '', {
      duration: 3000
    })
  }


  cancel():void{
    this.dialog.close();
  }

  // refresh():void{
  //   this.location.reload();
  // }

}
