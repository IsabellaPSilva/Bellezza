// reserva.page.ts

import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton, IonIcon, IonLabel, IonTabBar, IonTabButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  arrowBack, shareOutline, heartOutline, heart,
  homeOutline, calendarOutline, personOutline 
} from 'ionicons/icons';
import { Router ,RouterLink } from '@angular/router';

interface Servico {
  nome: string;
  preco: number;
  tempo: string;
  categoria: string;
}

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonIcon, IonLabel, IonTabBar, IonTabButton, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservaPage {
  favoritado = false;

  combos: Servico[] = [
    { nome: 'Aplique + unha', preco: 830.00, tempo: '3hr', categoria: 'combo' },
    { nome: 'Unha em gel + trança', preco: 830.00, tempo: '3hr', categoria: 'combo' }
  ];

  servicosCabelo: Servico[] = [
    { nome: 'Finalização', preco: 150.00, tempo: '45m', categoria: 'cabelo' },
    { nome: 'Alisamento', preco: 150.00, tempo: '1hr', categoria: 'cabelo' },
    { nome: 'Tranças', preco: 280.00, tempo: '2/3hr', categoria: 'cabelo' },
    { nome: 'Aplique', preco: 800.00, tempo: '2hr', categoria: 'cabelo' },
    { nome: 'Cabelo', preco: 350.00, tempo: '2hr', categoria: 'cabelo' }
  ];

  constructor() {
    addIcons({ 
      arrowBack, 
      shareOutline, 
      heartOutline,
      heart,
      homeOutline, 
      calendarOutline, 
      personOutline 
    });
  }

  voltar() {
    console.log('Voltar');
    // Implementar navegação
  }

  compartilhar() {
    console.log('Compartilhar');
    // Implementar compartilhamento
  }

  toggleFavorito() {
    this.favoritado = !this.favoritado;
    console.log('Favoritado:', this.favoritado);
  }

  reservar(servico: Servico) {
    console.log('Reservar serviço:', servico);
    // Implementar navegação para tela de agendamento
  }

  formatarPreco(preco: number): string {
    return preco.toLocaleString('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    });
  }
}