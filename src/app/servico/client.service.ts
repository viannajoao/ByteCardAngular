import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/Client';
import { Credito } from '../models/Credito';
import { CreditoPut } from '../models/CreditoPut';
import { Compras } from '../models/Compras';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url:string = 'https://softbank-backend.azurewebsites.net';
  private urlPost:string = 'https://softbank-backend.azurewebsites.net/cadastrar';
  private urlCartoes:string = 'https://softbank-backend.azurewebsites.net/cartoes';
  private urlPostCard:string = 'https://softbank-backend.azurewebsites.net/cadastrarCartoes';
  private urlPostBuy:string = 'https://softbank-backend.azurewebsites.net/compras/cadastrarCompras';
  private urlFatura:string = 'https://softbank-backend.azurewebsites.net/cartoes/faturas'
  private urlRelatorio:string = 'https://softbank-backend.azurewebsites.net/relatorios';
  private urlRelatoioGastos: string = 'https://softbank-backend.azurewebsites.net/relatorios/maisgastaram';
  private urlRelatorioNotBuy:string = 'https://softbank-backend.azurewebsites.net/relatorios/clientsNotBuy'
  private urlLogin:string = 'https://softbank-backend.azurewebsites.net/auth/login';
  private urlClientsFiltered: string = 'https://softbank-backend.azurewebsites.net/cartoes/cadastrarCartao';


  constructor(private http:HttpClient) { }

  //============================ GET ============================= //

  selecionar():Observable<Client[]>{
      return this.http.get<Client[]>(this.url)
  }

  selecionarCartoes():Observable<CreditoPut[]>{
    return this.http.get<CreditoPut[]>(this.urlCartoes)
  }

  selecionarClientes():Observable<Client[]>{
    return this.http.get<Client[]>(this.url)
  }

  getItemById(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.url}/${id}`);
  }

  getCreditById(id: string): Observable<Credito> {
    return this.http.get<Credito>(`${this.urlCartoes}/${id}`);
  }

  getItemCreditById(id: string): Observable<CreditoPut> {
    return this.http.get<CreditoPut>(`${this.urlCartoes}/${id}`);
  }

  getCreditPutById(id: string): Observable<CreditoPut> {
    return this.http.get<CreditoPut>(`${this.urlCartoes}/${id}`);
  }

  getCreditByCard(card: string): Observable<Compras[]>{
    return this.http.get<Compras[]>(`${this.urlFatura}/${card}`);
  }

  getClientsByCompras(): Observable<any[]>{
    return this.http.get<any[]>(`${this.urlRelatorio}`);
  }

  getClientsMaisGastaram(): Observable<any[]>{
    return this.http.get<any[]>(`${this.urlRelatoioGastos}`)
  }

  getClientsNotBuy(): Observable<any[]>{
    return this.http.get<any[]>(`${this.urlRelatorioNotBuy}`); //
  }

  getClientsFiltered():Observable<any[]>{
    return this.http.get<any[]>(`${this.urlClientsFiltered}`)
  }

  // ======================= POST ================================ //


  cadastrar(obj:Client):Observable<Client>{
    return this.http.post<Client>(this.urlPost, obj)

  }

  cadastrarCard(obj:Credito):Observable<Credito>{
    return this.http.post<Credito>(this.urlPostCard, obj)
  }

  cadastrarBuy(obj:Compras):Observable<Compras>{
    return this.http.post<Compras>(this.urlPostBuy, obj)
  }

  solicitarLogin(obj:any):Observable<any>{
    return this.http.post<any>(this.urlLogin, obj)
  }

// ================================= PUT ========================= //

updateItem(item: any): Observable<any> {
  return this.http.put<any>(`${this.url}/${item.id}`, item);
}

updateCreditItem(item: any): Observable<CreditoPut> {
  return this.http.put<CreditoPut>(`${this.urlCartoes}/${item.id}`, item);
}
// ================================= DELETE ========================= //

deleteItem(item: any): Observable<any> {
  return this.http.delete<any>(`${this.url}/${item.id}`, item);
}

deleteCreditItem(item: any): Observable<any> {
  return this.http.delete<any>(`${this.urlCartoes}/${item.id}`, item);
}




}


