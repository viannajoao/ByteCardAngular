import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/servico/client.service';
import { MainComponent } from '../main/main.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog-client',
  templateUrl: './dialog-client.component.html',
  styleUrls: ['./dialog-client.component.css']
})
export class DialogClientComponent implements OnInit {

  client: Client = new Client();
  clients: Client[] = [ ];
  item: Client = new Client();
  itemId:string = '';

  constructor(private service:ClientService, private dialog: MatDialogRef<DialogClientComponent>, @Inject(MAT_DIALOG_DATA) public data: Client, private snackBar: MatSnackBar) { }



  ngOnInit(): void {
    this.itemId = this.data.id; // Substitua pelo ID do item que você deseja atualizar
    this.service.getItemById(this.itemId).subscribe(result => {
      this.item = result;
      console.log(this.item)
    });
    console.log(this.item)
    // console.log(this.itemId)
  }


  atualizar():void{

    this.item.cpf = this.client.cpf
    this.item.name = this.client.name
    this.item.email = this.client.email
    this.item.tel = this.client.tel
    console.log(this.item)
    this.service.updateItem(this.item).subscribe(data => {
      console.log(data)
      this.onSucess()
      this.client = new Client()


    })


  }

  onSucess():void{
    this.snackBar.open("Usuario alterado com sucesso", '', {
      duration: 3000
    })
  }

  cancel():void{
    this.dialog.close()
  }



}


