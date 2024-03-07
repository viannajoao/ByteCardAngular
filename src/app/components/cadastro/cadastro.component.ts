import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/servico/client.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent  {

  client = new Client();
  clients:Client[] = [];

  constructor(private service: ClientService, private snackBar: MatSnackBar) { }



  cadastrar(): void {


    this.client.cpf = Number(this.client.cpf).toString().padStart(11, '0');
    this.client.tel.toString();


      if (this.client.cpf && this.client.tel && this.client.name && this.client.email != '') {
        this.service.cadastrar(this.client).subscribe(
          () => {
            this.onSuccess();
            this.client = new Client();
            console.log('Cliente cadastrado com sucesso');
          },
          error => {
            if (error.status === 400) {
              this.onCpf();
              console.log(this.client)
            } else if(error.status === 200) {
              this.onSuccess()
              this.client = new Client()
              console.log(this.client)
            }else{
              console.error('Erro ao cadastrar cliente:', error);
              this.onErro();
            }
          }
        );
      } else {
        this.onErro();
      }
    }

    onSuccess() {
      this.snackBar.open('Usuário cadastrado com sucesso', '', {
        duration: 5000
      });
    }

    onErro() {
      this.snackBar.open('Preencha todos os campos para efetuar o cadastro corretamente', '', {
        duration: 5000
      });
    }

    onCpf() {
      this.snackBar.open('CPF inválido ou E-mail já cadastrado', '', {
        duration: 3000
      });
    }


  }

