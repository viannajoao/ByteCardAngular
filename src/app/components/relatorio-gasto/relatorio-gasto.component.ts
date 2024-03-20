import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PoComboOption } from '@po-ui/ng-components';
import { Client } from 'src/app/models/Client';
import { Compras } from 'src/app/models/Compras';
import { Credito } from 'src/app/models/Credito';
import { CreditoPut } from 'src/app/models/CreditoPut';
import { ClientService } from 'src/app/servico/client.service';

@Component({
  selector: 'app-relatorio-gasto',
  templateUrl: './relatorio-gasto.component.html',
  styleUrls: ['./relatorio-gasto.component.css']
})
export class RelatorioGastoComponent implements OnInit {

  clients:Client[] = [];
  item: CreditoPut = new CreditoPut();
  itemId:string = '';
  filtroData: Date = new Date();
  // comprasFiltradas: Compras[] = [];

  buy: Compras = new Compras();
  buys:Compras[] = []
  buysFiltered:any = [];

  creditPut: CreditoPut = new CreditoPut();
  creditsPut: CreditoPut[] = [];

  credit: Credito = new Credito();
  credits: Credito[] = [ ];
  displayedColumns = ['categoria', 'valor'];

  dadosRecebidos: any;
  creditsOptions: PoComboOption[] = [];
  selectCredit: CreditoPut = new CreditoPut();

  public items: Array<any> = [{
    date: this.buy.date,
    categoria: this.buy.categoria,
    estabelecimento: this.buy.estabelecimento,
    valor: this.buy.valor,
  }]

  constructor(private service:ClientService, private snackBar: MatSnackBar) { }

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

  buscarCompras():void{
    this.service.getCreditByCard(this.selectCredit.numCartao).subscribe(retorno => {
      this.items = retorno
      this.buysFiltered = this.items; // Atualiza a lista de compras filtradas
      console.log(this.buysFiltered)
      this.filtroCategorias()
  }, err => { console.log(err) });

  }


  filtroCategorias(): void {
    let categoriasAgrupadas: any = {};

    // Itera sobre as compras filtradas
    this.buysFiltered.forEach((compra: any) => {
        let categoria = compra.categoria;
        let valor = compra.valor;
        let data = compra.date.split(' ')[0]; // Obtém apenas a parte da data

        // Verifica se a data já está no acumulador
        if (!categoriasAgrupadas[data]) {
            categoriasAgrupadas[data] = {};
        }

        // Verifica se a categoria já está no acumulador para essa data
        if (!categoriasAgrupadas[data][categoria]) {
            categoriasAgrupadas[data][categoria] = 0;
        }

        // Soma o valor para a categoria na data atual
        categoriasAgrupadas[data][categoria] += valor;
    });

    // Formata o resultado para o formato desejado
    let resultadoFormatado: any = [];

    // Itera sobre as datas agrupadas
    Object.keys(categoriasAgrupadas).forEach(data => {
        // Itera sobre as categorias na data atual
        Object.keys(categoriasAgrupadas[data]).forEach(categoria => {
            resultadoFormatado.push({
                data: data,
                categoria: categoria,
                valor: categoriasAgrupadas[data][categoria]
            });
        });
    });

    console.log(resultadoFormatado);
    // Você pode fazer algo com o resultadoFormatado, como atribuir a uma variável ou exibir em algum lugar
}



  formatarData(event: any) {
    const dataSelecionada = event.target.value;
    const [ano, mes] = dataSelecionada.split('-');
    this.filtroData = new Date(parseInt(ano), parseInt(mes) - 1, 1);
    console.log(this.filtroData)
    // this.filtrarComprasPorData()
  }


filtrarComprasPorData(event:any): void {
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


      // Agrupar e somar as categorias
      let categoriasAgrupadas = this.buysFiltered.reduce((accumulator: any, current: any) => {
          let categoria = current.categoria;
          let valor = current.valor;

          if (accumulator[categoria]) {
              accumulator[categoria] += valor;
          } else {
              accumulator[categoria] = valor;
          }

          return accumulator;
      }, {});

      let categoriasAgrupadasArray = Object.keys(categoriasAgrupadas).map(categoria => ({
          categoria: categoria,
          valor: categoriasAgrupadas[categoria]
      }));

      this.buysFiltered = categoriasAgrupadasArray;
  } else {
      this.buysFiltered = this.items;
  }
}

}
