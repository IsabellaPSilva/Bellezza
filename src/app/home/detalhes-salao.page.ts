// detalhes-salao.page.ts

import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton, IonIcon, IonTabBar, IonTabButton, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';
import { arrowBack, logoInstagram, logoFacebook, homeOutline, calendarOutline, personOutline, star, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-salao-detalhes',
  templateUrl: './detalhes-salao.page.html',
  styleUrls: ['./detalhes-salao.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonIcon, IonTabBar, IonTabButton, IonLabel, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetalhesSalaoPage {
  images = [
    'assets/SalaoMaeeFilhas1.png',
    'assets/SalaoMaeeFilhas2.png',
    'assets/SalaoMaeeFilhas3.png'
  ];

  avaliacoes = [
    { estrelas: 5, quantidade: 80 },
    { estrelas: 4, quantidade: 15 },
    { estrelas: 3, quantidade: 3 },
    { estrelas: 2, quantidade: 1 },
    { estrelas: 1, quantidade: 1 }
  ];

  constructor() {
    addIcons({ 
      arrowBack, 
      logoInstagram, 
      logoFacebook, 
      homeOutline,
      calendarOutline,
      personOutline,
      star,
      starOutline
    });
  }

  voltar() {
    console.log('Voltar');
    // Implementar navegação: this.navCtrl.back();
  }

  abrirServicos() {
    console.log('Abrir serviços');
    // Implementar navegação para serviços
  }

  getProgressWidth(quantidade: number): string {
    const total = this.avaliacoes.reduce((acc, curr) => acc + curr.quantidade, 0);
    return `${(quantidade / total) * 100}%`;
  }
}