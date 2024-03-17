import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servico/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  jsonLogin: any = {login: '' , password: ''};

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login(event:any): void {
    this.jsonLogin.login = event.login;
    this.jsonLogin.password = event.password;
    console.log(event);
    this.authService.login(this.jsonLogin).then(reponse =>{
      this.snackBar.open("Login efetuado com sucesso, bem vindo !!",  "" , {duration:3000});
      this.router.navigateByUrl("/main")
    }).catch( err => {
      this.snackBar.open("usuario ou senha incorretos", "", {
        duration: 3000
      })
    })
  }

}
