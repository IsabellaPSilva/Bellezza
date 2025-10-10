import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-localizacaoP',
  templateUrl: './localizacaoP.page.html',
  styleUrls: ['./localizacaoP.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LocalizacaoPPage { 
  endereco: string = '';
  mapaUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.850745627053!2d-46.65657158452902!3d-23.55051928469164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59aadc47d3b7%3A0x4dfc2a74f2a5e1b6!2sAv.%20Paulista%2C%20São%20Paulo!5e0!3m2!1spt-BR!2sbr!4v1673809659093'
    );
  }

  atualizarMapa() {
    if (!this.endereco) return;

    const url = `https://www.google.com/maps/embed/v1/place?key=SUA_API_KEY&q=${encodeURIComponent(
      this.endereco
    )}`;
    this.mapaUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
