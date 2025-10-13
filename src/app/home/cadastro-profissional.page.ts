import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-profissional',
  templateUrl: './cadastro-profissional.page.html',
  styleUrls: ['./cadastro-profissional.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class CadastroProfissionalPage {
  constructor(private router: Router) {}

  cadastrar() {
    // navega para a página AtivarLocalizacao
    this.router.navigate(['/localizacaoP']);
  }
}