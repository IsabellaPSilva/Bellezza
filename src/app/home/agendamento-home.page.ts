import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendamento-home',
  templateUrl: './agendamento-home.page.html',
  styleUrls: ['./agendamento-home.page.scss'],
  standalone: true,
  imports: [
    IonicModule,  // 👈 obrigatório!
    CommonModule
  ]
})
export class AgendamentoHomePage {

  constructor(private router: Router) {}

  irParaPerfil() {
    this.router.navigate(['/perfil']); // 👈 rota da tela de perfil
  }

  irParaCategoria() {
    this.router.navigate(['/categoria']); // 👈 rota da tela de perfil
  }

}
