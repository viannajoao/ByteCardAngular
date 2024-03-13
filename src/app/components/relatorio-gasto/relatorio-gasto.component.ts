import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private service:ClientService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.selecionar();
    console.log(this.creditsPut)
  }

  selecionar():void{
    this.service.selecionarCartoes()
    .subscribe(retorno => this.creditsPut = retorno)
  }

  buscarCompras():void{
    this.service.getCreditByCard(this.buy.cartao).subscribe(retorno => {
      this.buys = retorno
      this.buysFiltered = this.buys; // Atualiza a lista de compras filtradas
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
    this.filtrarComprasPorData()
  }


filtrarComprasPorData(): void {
  if (this.filtroData) {
      const ano = this.filtroData.getFullYear();
      const mes = ('0' + (this.filtroData.getMonth() + 1)).slice(-2);
      const dataFormatada = `${ano}-${mes}`;
      console.log(dataFormatada)
      // Filtrar as compras com base na data formatada
      this.buysFiltered = this.buys.filter(compra => {
          const dataCompraArray = compra.date.split(' ')[0].split('/');
          const dataCompraFormatada = `${dataCompraArray[2]}-${dataCompraArray[1]}`;
          console.log(dataCompraFormatada)
          return dataCompraFormatada === dataFormatada;
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
      this.buysFiltered = this.buys;
  }
}

}
