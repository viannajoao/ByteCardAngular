import { AuthService } from './servico/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Verifica se o usuário está autenticado
    if (this.authService.isAuthenticated()) {
      // Permite a ativação da rota
      return true;
    } else {
      // Redireciona o usuário para a página de login
      this.router.navigate(['/auth/login']);
      // Não permite a ativação da rota
      return false;
    }
  }
  }




