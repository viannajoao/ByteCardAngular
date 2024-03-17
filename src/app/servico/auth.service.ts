import { Injectable } from '@angular/core';
import { Client } from '../models/Client';
import { ClientService } from './client.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any = ''


  constructor(private service: ClientService, private router: Router) { }

    // Método para realizar o login
    login(obj: any): Promise<void> {
      return new Promise<void>((resolve, reject) => {

        this.service.solicitarLogin(obj).subscribe(retorno => {
          this.token = retorno
          console.log(this.token)
          localStorage.setItem('token', this.token.token)
          resolve()
        }, err => {
          alert("Usuario nao existente")
          reject()
        })


      })
    }

    // Método para realizar o logout
    logout(): void {
      // Lógica para fazer logout e remover o token do armazenamento local
    }

    // Método para verificar se o usuário está autenticado
    isAuthenticated(): boolean {
      const token = localStorage.getItem('token')
      if(token != null){
        return true
      }
      // Lógica para verificar se o token está presente e válido
      // Normalmente, verifica se o token está no armazenamento local e se não expirou
      // Retorna true se o usuário estiver autenticado, false caso contrário
      return false; // Exemplo simples, você precisa implementar sua própria lógica
    }


}
