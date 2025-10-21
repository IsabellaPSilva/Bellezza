import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-agendamento-home-profissional',
  templateUrl: './agendamento-home-profissional.page.html',
  styleUrls: ['./agendamento-home-profissional.page.scss'],
  standalone: true,
  imports: [
    IonicModule,  // 👈 obrigatório!
    CommonModule,
    RouterLink
  ]
})
export class AgendamentoHomePageProfissional {

  constructor(private router: Router) {}

  irParaPerfil() {
    this.router.navigate(['/perfilP']); // 👈 rota da tela de perfil
  }

}
