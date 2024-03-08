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

  private url:string = 'http://localhost:8080';
  private urlPost:string = 'http://localhost:8080/cadastrar';
  private urlCartoes:string = 'http://localhost:8080/cartoes';
  private urlPostCard:string = 'http://localhost:8080/cadastrarCartoes';
  private urlPostBuy:string = 'http://localhost:8080/compras/cadastrarCompras';
  private urlFatura:string = 'http://localhost:8080/cartoes/faturas'


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

  getCreditPutById(id: string): Observable<CreditoPut> {
    return this.http.get<CreditoPut>(`${this.urlCartoes}/${id}`);
  }

  getCreditByCard(card: string): Observable<Compras>{
    return this.http.get<Compras>(`${this.urlFatura}/${card}`);
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


