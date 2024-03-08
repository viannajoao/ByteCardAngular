import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Compras } from 'src/app/models/Compras';
import { Credito } from 'src/app/models/Credito';
import { CreditoPut } from 'src/app/models/CreditoPut';
import { ClientService } from 'src/app/servico/client.service';

@Component({
  selector: 'app-fatura',
  templateUrl: './fatura.component.html',
  styleUrls: ['./fatura.component.css']
})
export class FaturaComponent implements OnInit {

  item: CreditoPut = new CreditoPut();
  itemId:string = '';

  buys:Compras[] = []
  buysFiltered:Compras[] = [];

  creditPut: CreditoPut = new CreditoPut();
  creditsPut: CreditoPut[] = [];

  credit: Credito = new Credito();
  credits: Credito[] = [ ];
  displayedColumns = [ 'date' , 'estabelecimento', 'categoria', 'valor'];

  dadosRecebidos: any;

  constructor(private service:ClientService, private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.selecionar()
    // Recupera os parâmetros da URL


    this.route.params.subscribe(params => {

      console.log(params)
      // Verifica se há um parâmetro chamado 'id'
      if (params['id']) {

        this.service.getCreditById(params['id']).subscribe(credit => {
          this.dadosRecebidos = credit

          console.log(this.dadosRecebidos)
          this.service.getCreditByCard(this.dadosRecebidos.numCartao).subscribe(retorno => {
            this.buys.push(retorno)
            this.buysFiltered = this.buys
            console.log(this.buysFiltered)
        }, err => { console.log(err) });
        // console.log(this.buys)
        })
      }

      // console.log(this.dadosRecebidos)

    });

this.selecionar()
alert(this.buys)
  }

  selecionar():void{

    this.service.getCreditByCard(this.dadosRecebidos.numCartao).subscribe(retorno => {
      this.buys.push(retorno)
      console.log(this.buys)
  }, err => { console.log(err) });
  console.log(this.buys)
  }

  atualizar():void{
    console.log(this.item)

    this.item.limity = this.credit.limity

    console.log(this.item)
    this.service.updateCreditItem(this.item).subscribe(data => {
      console.log(data)
      this.onSucess()

      // this.cancel()

    })


  }

  onSucess():void{
    this.snackBar.open("Limite do cliente modificado", '', {
      duration: 3000
    })
  }

  // cancel():void{
  //   this.dialog.close()
  // }



}
