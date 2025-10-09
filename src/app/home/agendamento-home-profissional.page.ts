import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendamento-home-profissional',
  templateUrl: './agendamento-home-profissional.page.html',
  styleUrls: ['./agendamento-home-profissional.page.scss'],
  standalone: true,
  imports: [
    IonicModule,  // 👈 obrigatório!
    CommonModule
  ]
})
export class AgendamentoHomePageProfissional {

  constructor(private router: Router) {}

  irParaPerfil() {
    this.router.navigate(['/perfil']); // 👈 rota da tela de perfil
  }

}
