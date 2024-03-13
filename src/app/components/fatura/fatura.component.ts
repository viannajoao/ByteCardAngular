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
  filtroData: Date = new Date();
  // comprasFiltradas: Compras[] = [];

  buys:Compras[] = []
  buysFiltered:Compras[] = [];

  creditPut: CreditoPut = new CreditoPut();
  creditsPut: CreditoPut[] = [];

  credit: Credito = new Credito();
  credits: Credito[] = [ ];
  displayedColumns = [ 'date' , 'estabelecimento', 'categoria', 'valor'];

  dadosRecebidos: any;

  constructor(private service:ClientService, private snackBar: MatSnackBar, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {

    this.route.params.subscribe(async params => {

      console.log(params)
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
      this.buys = retorno
      this.buysFiltered = this.buys; // Atualiza a lista de compras filtradas
      console.log(this.buysFiltered)
  }, err => { console.log(err) });

  }

  formatarData(event: any) {
    const dataSelecionada = event.target.value;
    const [ano, mes] = dataSelecionada.split('-');
    this.filtroData = new Date(parseInt(ano), parseInt(mes) - 1, 1);

    this.filtrarComprasPorData()
  }

  filtrarComprasPorData(): void {
    if (this.filtroData) {
        // Convertendo this.filtroData para uma string no formato 'yyyy-mm'
        const ano = this.filtroData.getFullYear();
        const mes = ('0' + (this.filtroData.getMonth() + 1)).slice(-2); // Obtém o mês com zero à esquerda, se necessário
        const dataFormatada = `${ano}-${mes}`;

        // Filtrar as compras com base na data formatada
        this.buysFiltered = this.buys.filter(compra => {
            // Convertendo a data da compra para o mesmo formato 'yyyy-mm'
            const dataCompraArray = compra.date.split(' ')[0].split('/'); // Convertendo a data da compra para um array de strings ["dd", "mm", "yyyy"]
            const dataCompraFormatada = `${dataCompraArray[2]}-${dataCompraArray[1]}`; // Montando a data da compra no formato 'yyyy-mm'

            return dataCompraFormatada === dataFormatada;
        });
    } else {
        // Se não houver uma data de filtro válida, exiba todas as compras
        this.buysFiltered = this.buys;
    }
}




}
