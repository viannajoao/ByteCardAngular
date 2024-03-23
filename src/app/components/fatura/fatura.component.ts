import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PoTableColumn } from '@po-ui/ng-components';
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
  filtroData: string = '';
  // comprasFiltradas: Compras[] = [];

  buy: Compras = new Compras();
  buys:Compras[] = []
  buysFiltered:Compras[] = [];

  creditPut: CreditoPut = new CreditoPut();
  creditsPut: CreditoPut[] = [];

  credit: Credito = new Credito();
  credits: Credito[] = [ ];
  displayedColumns = [ 'date' , 'estabelecimento', 'categoria', 'valor'];

  public items: Array<any> = [{
    date: this.buy.date,
    categoria: this.buy.categoria,
    estabelecimento: this.buy.estabelecimento,
    valor: this.buy.valor,
  }]

  readonly columns: Array<PoTableColumn> = [
    {property: 'date', label: 'DATA', },
    {property: 'categoria',label: 'CATEGORIA', },
    {property: 'estabelecimento',label: 'ESTABELECIMENTO', },
    {property: 'valor',label: 'VALOR', },
    // {property: 'this.actions' ,label: 'ACOES', }
  ]

  dadosRecebidos: any;
  somaTotal: number = 0;

  constructor(private service:ClientService, private snackBar: MatSnackBar, private route: ActivatedRoute) {
    // this.calcularSoma()
   }

  async ngOnInit(): Promise<void> {

    this.route.params.subscribe(async params => {

      // console.log(params)
      if (params['id']) {

     const search = await this.service.getCreditById(params['id']).subscribe(async credit => {
          this.dadosRecebidos = credit
          const select = await this.selecionar(this.dadosRecebidos.numCartao)
        })
      }

    });


  }

  selecionar(id:string):void{
    console.log(this.dadosRecebidos)
      console.log(id)
    this.service.getCreditByCard(id).subscribe(retorno => {
      this.items = retorno
      this.buysFiltered = this.items; // Atualiza a lista de compras filtradas
      console.log(this.buysFiltered)
      this.calcularSoma(this.buysFiltered)
  }, err => { console.log(err) });

  }

  // formatarData(event: any) {
  //   console.log(event)
  //   const selectDate = new Date(event)
  //   const formaterDate = selectDate.toLocaleDateString('pt-BR', {year: 'numeric', month: 'numeric'})
  //   console.log(formaterDate)
  //   const dataSelecionada = formaterDate
  //   console.log(dataSelecionada)
  //   const [ano, mes] = dataSelecionada.split('-');
  //   this.filtroData = dataSelecionada
  //   // this.filtroData = new Date(parseInt(ano), parseInt(mes) - 1, 1);
  //   console.log(this.filtroData)
  //   // this.filtrarComprasPorData()
  // }

  filtrarComprasPorData(event: any): void {
    if (event) {
      console.log(event);
      // Convertendo a data do evento para o mesmo formato 'mm/yyyy'
      const dataEventoArray = event.split('/'); // Convertendo a data do evento para um array de strings ["dd", "mm", "yyyy"]
      const dataEventoFormatada = `${dataEventoArray[1]}/${dataEventoArray[2]}`; // Montando a data do evento no formato 'mm/yyyy'
      console.log(dataEventoFormatada);

      // Filtrando as compras com base na data do evento
      this.buysFiltered = this.items.filter(compra => {
        // Convertendo a data da compra para o mesmo formato 'mm/yyyy'
        const dataCompraArray = compra.date.split(' ')[0].split('/'); // Convertendo a data da compra para um array de strings ["dd", "mm", "yyyy"]
        const dataCompraFormatada = `${dataCompraArray[1]}/${dataCompraArray[2]}`; // Montando a data da compra no formato 'mm/yyyy'

        // Comparando a data da compra com a data do evento
        return dataCompraFormatada === dataEventoFormatada;
      });
    } else {
      // Se não houver uma data de filtro válida, exiba todas as compras
      this.buysFiltered = this.items;
    }
  }

  calcularSoma(params:any){
    console.log(params)
    this.somaTotal = params.reduce((total: any, item: any) => total + item.valor, 0)
    console.log(this.somaTotal)
  }





}
