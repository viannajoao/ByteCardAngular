import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';
import { CartoesComponent } from './components/cartoes/cartoes.component';
import { CadastroCartaoComponent } from './components/cadastro-cartao/cadastro-cartao.component';
import { FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogClientComponent } from './components/dialog-client/dialog-client.component';
import { DialodDeleteComponent } from './components/dialod-delete/dialod-delete.component';
import {MatSelectModule} from '@angular/material/select';
import { DialogDeleteCardComponent } from './components/dialog-delete-card/dialog-delete-card.component';
import { DialogCardComponent } from './components/dialog-card/dialog-card.component';
import { setTimeout } from 'timers';
import { Location } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    NavbarComponent,
    MainComponent,
    CartoesComponent,
    CadastroCartaoComponent,
    DialogClientComponent,
    DialodDeleteComponent,
    DialogDeleteCardComponent,
    DialogCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
    MatTableModule,
    CommonModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
