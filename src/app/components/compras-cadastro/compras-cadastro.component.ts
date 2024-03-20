import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PoComboOption, PoSelectOption } from '@po-ui/ng-components';
import { Client } from 'src/app/models/Client';
import { Compras } from 'src/app/models/Compras';
import { Credito } from 'src/app/models/Credito';
import { CreditoPut } from 'src/app/models/CreditoPut';
import { ClientService } from 'src/app/servico/client.service';

@Component({
  selector: 'app-compras-cadastro',
  templateUrl: './compras-cadastro.component.html',
  styleUrls: ['./compras-cadastro.component.css']
})
export class ComprasCadastroComponent implements OnInit {

  clients:Client[] = [];
  creditsPut:CreditoPut[] = [];
  buy:Compras = new Compras();
  buys:Compras[] = [];
  selectCredit: CreditoPut = new CreditoPut();
  selectCredits: Credito = new Credito();

  creditsOptions: PoComboOption[] = [];

  public readonly category: Array<PoSelectOption> = [
    { label: 'Lazer', value: 'Lazer' },
    { label: 'Saude', value: 'Saude' },
    { label: 'Alimentacao', value: 'Alimentacao' },
    { label: 'Viagem', value: 'Viagem' },
    { label: 'PetShop', value: 'PetShop' },
  ];

  constructor(private service:ClientService, private snackBar: MatSnackBar, private route: Router) { }

  ngOnInit(): void {
    this.selecionar();
    console.log(this.creditsPut)
  }

  selecionar():void{
    this.service.selecionarCartoes()
    .subscribe(retorno => {
      this.creditsPut = retorno
      this.creditsOptions = this.creditsPut.map(credit => ({
        label: credit.numCartao + " - " + credit.client,
        value: credit.id
      }))
    })
  }

  getCreditById(creditSelect:any){
    console.log(creditSelect)
    this.service.getItemCreditById(creditSelect).subscribe(retorno => {
      this.selectCredit = retorno
      console.log(this.selectCredit)
    });
  }

  getCategory(category:any){
    console.log(category)
    this.buy.categoria = category
  }

  cadastrar():void{
    this.buy.cartao = this.selectCredit.numCartao
    this.buy.credits_id = this.selectCredit
    this.service.cadastrarBuy(this.buy).subscribe(retorno => {
      this.buys.push(retorno)
      this.onSucess();
      console.log(this.buys)
      this.buy = new Compras();
    }, err => {
      if(err.status === 403){
        this.onToken();
      }else if(err.status === 200){
        this.onSucess()
      }
      this.onError();
    })
  }

  onSucess():void{
    this.snackBar.open("Cartao cadastrado com sucesso", '', {
      duration: 3000
    })
  }

  onError():void{
    this.snackBar.open("Erro ao cadastrar", '', {
      duration: 3000
    })
  }

  onToken(){
    this.snackBar.open('Usuário sem permissao ou CPF invalido', '', {
      duration: 3000
    })
  }

  cancel() {
    this.route.navigateByUrl('/')
  }

}
