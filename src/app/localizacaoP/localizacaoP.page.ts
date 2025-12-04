import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-localizacaoP',
  templateUrl: './localizacaoP.page.html',
  styleUrls: ['./localizacaoP.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class LocalizacaoPPage { 
endereco: string = '';
  mapaUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
       'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3693.2132791916883!2d-45.93204432382523!3d-22.231985214105137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cbc7bb081e9e59%3A0xe2d23c62e946a65b!2sSenac%20em%20Pouso%20Alegre!5e0!3m2!1spt-BR!2sbr!4v1764869530443!5m2!1spt-BR!2sbr');
  
  }

  atualizarMapa() {
    if (!this.endereco) return;

    const url = `https://www.google.com/maps/embed/v1/place?key=SUA_API_KEY&q=${encodeURIComponent(
      this.endereco
    )}`;
    this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
