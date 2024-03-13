import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/servico/client.service';

@Component({
  selector: 'app-dialod-delete',
  templateUrl: './dialod-delete.component.html',
  styleUrls: ['./dialod-delete.component.css']
})
export class DialodDeleteComponent implements OnInit {

  client: Client = new Client()
  clients: Client[] = [];
  item: Client = new Client();
  itemId: string = '';

  constructor(private dialog: MatDialogRef<DialodDeleteComponent>, private service: ClientService, @Inject(MAT_DIALOG_DATA) public data: Client, private snackBar: MatSnackBar ) {}

  ngOnInit(): void {
    this.itemId = this.data.id; // Substitua pelo ID do item que você deseja atualizar
    this.service.getItemById(this.itemId).subscribe(result => {
      this.item = result;
      console.log(this.item)
    });
    console.log(this.item)
    // console.log(this.itemId)
  }

  deleteItem(): void {
    console.log(this.item)
    this.service.deleteItem(this.item).subscribe(result => {
      console.log(result)
      this.onSucess()
      this.cancel()
    })
  }

  onSucess():void{
    this.snackBar.open("Usuario deletado com sucesso", '', {
      duration: 3000
    })
  }


  cancel():void{
    this.dialog.close();
  }

}
