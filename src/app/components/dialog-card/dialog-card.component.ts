import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/app/models/Client';
import { Credito } from 'src/app/models/Credito';
import { CreditoPut } from 'src/app/models/CreditoPut';
import { ClientService } from 'src/app/servico/client.service';

@Component({
  selector: 'app-dialog-card',
  templateUrl: './dialog-card.component.html',
  styleUrls: ['./dialog-card.component.css']
})
export class DialogCardComponent implements OnInit {

  client: Client = new Client();
  clients: Client[] = [ ];
  item: CreditoPut = new CreditoPut();
  itemId:string = '';

  credit: Credito = new Credito();
  credits: Credito[] = [ ];

  creditPut: CreditoPut = new CreditoPut();
  creditsPut: CreditoPut[] = [];

  constructor(private service:ClientService, private dialog: MatDialogRef<DialogCardComponent>, @Inject(MAT_DIALOG_DATA) public data: CreditoPut, private snackBar: MatSnackBar) { }



  ngOnInit(): void {
    this.itemId = this.data.id; // Substitua pelo ID do item que você deseja atualizar
    this.service.getCreditPutById(this.itemId).subscribe(result => {
      this.item = result;
      // console.log(this.item)
    });
    // console.log(this.item)
    // console.log(this.itemId)
  }


  atualizar():void{
    console.log(this.item)

    this.item.limity = this.credit.limity

    console.log(this.item)
    this.service.updateCreditItem(this.item).subscribe(
      (data) => {
      console.log(data)
      this.onSucess()
      this.client = new Client()
      this.cancel()

    }, error => {
      if(error.status == 400){
        this.onError();
      }else if(error.status == 200) {
        this.onSucess()
        this.cancel()
      }else if(error.status == 403){
        this.onLimite()
      }
    })


  }

  onSucess():void{
    this.snackBar.open("Limite do cliente modificado", '', {
      duration: 7000
    })
  }

  cancel():void{
    this.dialog.close()
  }

  onError():void{
    this.snackBar.open("Limite menor do que o atual", '', {
      duration: 7000
    })
  }

  onLimite():void{
    this.snackBar.open("Usuario sem permissão ou limite menor do que o atual", '', {
      duration: 7000
    })
  }

}
