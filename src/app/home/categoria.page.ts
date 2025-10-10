import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class CategoriaPage {
  categoriaSelecionada: string = '';

  saloes = [
    { nome: 'Salão Mãe e Filhas', avaliacao: 5.0, avaliacoes: 570 },
    { nome: 'La_belle_style', avaliacao: 4.9, avaliacoes: 450 },
    { nome: 'Studio Glamour', avaliacao: 4.8, avaliacoes: 390 }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.categoriaSelecionada = params['nome'] || 'Categoria';
    });
  }

  irParaPerfil() {
    this.router.navigate(['/perfil']);
  }
}
