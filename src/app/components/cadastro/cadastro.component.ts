import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { PoDynamicFormField, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { PoDynamicField } from '@po-ui/ng-components/lib/components/po-dynamic/po-dynamic-field.interface';
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
  fields: Array<PoDynamicFormField> = [
    {property: 'cpf', label: 'CPF', mask: '999.999.999-99', placeholder: '999.999.999-99' },
    {property: 'name', label: 'NOME', placeholder: 'Digite o seu nome'},
    {property: 'email', type: 'email', label: 'Email', icon: 'po-icon-mail', placeholder: 'usuario@gmail.com'},
    {property: 'phone', mask: '(11)99999-9999', label: 'Telefone', placeholder: '(11)99999-9999'},

  ]


  constructor(private service: ClientService, private snackBar: MatSnackBar, private route: Router) { }



  cadastrar(): void {

    console.log(this.client)
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
            }else if(error.status === 403) {
                this.onToken()
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

    onToken(){
      this.snackBar.open('Usuário sem permissao ou CPF invalido', '', {
        duration: 3000
      })
    }

    cancel() {
      this.route.navigateByUrl('/')
    }


  }

