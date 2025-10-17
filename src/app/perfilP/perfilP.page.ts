import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonLabel,
  IonTabs,
  IonTabBar,
  IonTabButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-perfil-p',
  templateUrl: './PerfilP.page.html',
  styleUrls: ['./PerfilP.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonLabel,
    IonTabs,
    IonTabBar,
    IonTabButton,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PerfilPPage {
  constructor() {}
 
  salvar() {
    console.log("Salvar alterações");
  }
 
  gerenciar() {
    console.log("Gerenciar chave de acesso");
  }
 
  sair() {
    console.log("Sair");
  }
 
  excluir() {
    console.log("Excluir conta");
  }
}
 
 