import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from '../models/Client';
import { Credito } from '../models/Credito';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private url:string = 'http://localhost:8080';
  private urlPost:string = 'http://localhost:8080/cadastrar';
  private urlCartoes:string = 'http://localhost:8080/cartoes';
  private urlPostCard:string = 'http://localhost:8080/cadastrarCartoes';

  constructor(private http:HttpClient) { }

  //============================ GET ============================= //

  selecionar():Observable<Client[]>{
      return this.http.get<Client[]>(this.url)
  }

  selecionarCartoes():Observable<Credito[]>{
    return this.http.get<Credito[]>(this.urlCartoes)
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

  // ======================= POST ================================ //


  cadastrar(obj:Client):Observable<Client>{
    return this.http.post<Client>(this.urlPost, obj)

  }

  cadastrarCard(obj:Credito):Observable<Credito>{
    return this.http.post<Credito>(this.urlPostCard, obj)
  }


// ================================= PUT ========================= //

updateItem(item: any): Observable<any> {
  return this.http.put<any>(`${this.url}/${item.id}`, item);
}

// ================================= DELETE ========================= //

deleteItem(item: any): Observable<any> {
  return this.http.delete<any>(`${this.url}/${item.id}`, item);
}

deleteCreditItem(item: any): Observable<any> {
  return this.http.delete<any>(`${this.urlCartoes}/${item.id}`, item);
}




}


