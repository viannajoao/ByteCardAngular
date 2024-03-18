import { Injectable } from '@angular/core';
import { Client } from '../models/Client';
import { ClientService } from './client.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private inactivityTimeout: any;
  private readonly inactivityDuration = 30 * 60 * 1000;
  token: any = ''


  constructor(private service: ClientService, private router: Router) {
    this.setupInactivityTimer();
    this.detectUserActivity();
   }

  private setupInactivityTimer(): void {
    this.inactivityTimeout = setTimeout(() => {
      this.logout();
    }, this.inactivityDuration);
  }

  private detectUserActivity(): void {
    ['mousemove', 'mousedown', 'keypress', 'touchstart'].forEach(eventName => {
      window.addEventListener(eventName, () => {
        clearTimeout(this.inactivityTimeout);
        this.setupInactivityTimer();
      });
    });
  }

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


    logout(): void {

    localStorage.removeItem('token');

    this.router.navigate(['/auth/login']);
    }


    isAuthenticated(): boolean {
      const token = localStorage.getItem('token')
      if(token != null){
        return true
      }
      return false;
    }


}
