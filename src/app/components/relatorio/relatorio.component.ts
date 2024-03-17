import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/servico/client.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

  buys:any[] = [];
  maisCompras: any[] = [];
  maisComprasFiltered: any[] = [];
  filtroData: Date = new Date();

  maisGastaram: any[] = [];
  maisGastaramFiltered: any[] = [];

  notBuy: any[] = [];
  notBuyFiltered: any[] = [];

  displayedColumns = ['maisCompras'];
  displayedColumns1 = ['maisGastaram'];
  displayedColumns2 = ['notBuy'];

  constructor(private service:ClientService) { }

  ngOnInit(): void {
    this.getMaisCompras();
    this.getMaisGastaram();
    this.getNotBuy()
  }

  getMaisCompras(): void {
      this.service.getClientsByCompras().subscribe(client => {
        this.maisCompras = client
        this.maisComprasFiltered = this.maisCompras
        console.log(this.maisComprasFiltered)
      }, err => {console.log(err)})

  }

  getMaisGastaram():void{
    this.service.getClientsMaisGastaram().subscribe( client => {
      this.maisGastaram = client
      this.maisGastaramFiltered = this.maisGastaram
      console.log(this.maisGastaram)
    }, err => { console.log(err)})
  }

  getNotBuy():void{
    this.service.getClientsNotBuy().subscribe( client => {
      this.notBuy = client
      this.notBuyFiltered = this.notBuy
      console.log(this.notBuyFiltered)
    }, err => { console.log(err)})
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
    console.log(dataEventoFormatada)

      // Filtrar as compras com base na data formatada
      this.maisComprasFiltered = this.maisCompras.filter(compra => {
          const dataCompraArray = compra.horario.split(' ')[0].split('/');
          const dataCompraFormatada = `${dataCompraArray[1]}/${dataCompraArray[2]}`;
          console.log(dataCompraFormatada)
          return dataCompraFormatada === dataEventoFormatada;
      });
      this.maisGastaramFiltered = this.maisGastaram.filter(compra => {
        const dataCompraArray = compra.horario.split(' ')[0].split('/');
        const dataCompraFormatada = `${dataCompraArray[1]}/${dataCompraArray[2]}`;
        console.log(dataCompraFormatada)
        return dataCompraFormatada === dataEventoFormatada;
      });
      this.notBuyFiltered = this.notBuy.filter(compra => {
        const dataCompraArray = compra.horario.split(' ')[0].split('/');
        const dataCompraFormatada = `${dataCompraArray[1]}/${dataCompraArray[2]}`;
        console.log(dataCompraFormatada)
        return dataCompraFormatada === dataEventoFormatada;
      });


      // Agrupar e somar as categorias
} else {
  this.maisComprasFiltered = this.maisCompras
}

}

}
