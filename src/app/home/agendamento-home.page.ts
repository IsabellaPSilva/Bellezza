import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-agendamento-home',
  templateUrl: './agendamento-home.page.html',
  styleUrls: ['./agendamento-home.page.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule,
    RouterLink   // ✅ use RouterLink no lugar de Router aqui!
  ]
})
export class AgendamentoHomePage {

  constructor(private router: Router) {}

  abrirCategoria(nome: string) {
    this.router.navigate(['/categoria']);
  }

  irParaPerfil() {
    this.router.navigate(['/perfil']);
  }

}
