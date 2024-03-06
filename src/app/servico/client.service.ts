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

  selecionar():Observable<Client[]>{
      return this.http.get<Client[]>(this.url)
  }

  selecionarCartoes():Observable<Credito[]>{
    return this.http.get<Credito[]>(this.urlCartoes)
  }

  selecionarClientes():Observable<Client[]>{
    return this.http.get<Client[]>(this.url)
  }

  cadastrar(obj:Client):Observable<Client>{
    return this.http.post<Client>(this.urlPost, obj)

  }

  cadastrarCard(obj:Credito):Observable<Credito>{
    return this.http.post<Credito>(this.urlPostCard, obj)
  }
}


