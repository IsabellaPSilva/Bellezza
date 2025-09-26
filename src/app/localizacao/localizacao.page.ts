import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-localizacao',
  templateUrl: './localizacao.page.html',
  styleUrls: ['./localizacao.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class LocalizacaoPage { 
  endereco: string = '';
  mapaUrl: string = this.gerarUrlMapa('');

  // Gera a URL do mapa com base no endereço digitado
  gerarUrlMapa(endereco: string) {
    const enderecoCodificado = encodeURIComponent(endereco || 'São Paulo, Brasil');
    return `https://www.google.com/maps/embed/v1/place?key=SUA_API_KEY&q=${enderecoCodificado}`;
  }

  // Atualiza o mapa quando usuário digita
  atualizarMapa() {
    this.mapaUrl = this.gerarUrlMapa(this.endereco);
  }

  continuar() {
    if (!this.endereco) {
      alert('Por favor, insira o endereço!');
    } else {
      console.log('Endereço digitado:', this.endereco);
    }
  }
}