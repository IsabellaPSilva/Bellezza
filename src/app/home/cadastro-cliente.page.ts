import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.page.html',
  styleUrls: ['./cadastro-cliente.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class CadastroClientePage {
  constructor(private router: Router) {}

  cadastrar() {
    // navega para a página AtivarLocalizacao
    this.router.navigate(['/localizacao']);
  }
}