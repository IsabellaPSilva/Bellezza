import { Component } from '@angular/core';
import { IonContent, IonButton, IonLabel, IonItem, IonAvatar, IonIcon, IonList, IonRadioGroup, IonRadio, IonFooter, IonTabBar,IonTabButton, } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { createOutline, callOutline, mailOutline, keyOutline, lockClosedOutline, homeOutline, calendarOutline, personOutline } from 'ionicons/icons';
import { IonTabs } from '@ionic/angular/standalone';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
     IonContent, IonButton, IonLabel, IonItem, IonAvatar, IonIcon, IonList,
    IonRadioGroup, IonRadio, IonTabBar, IonTabButton, RouterModule
  ]
})
export class PerfilPage {
  constructor() {
    addIcons({ createOutline, callOutline, mailOutline, keyOutline, lockClosedOutline, homeOutline, calendarOutline, personOutline });
  }

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
