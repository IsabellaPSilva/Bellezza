import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-agendamento-home',
  templateUrl: './agendamento-home.page.html',
  styleUrls: ['./agendamento-home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class AgendamentoHomePage {

  constructor(private router: Router) {}

  // 🧠 Lista de categorias (usada no *ngFor do HTML)
  categorias: string[] = [
    'Unhas',
    'Cabelo',
    'Bronze',
    'Cílios',
    'Sobrancelhas',
    'Maquiagem',
    'Depilação',
    'Massagens',
    'Pele'
  ];

  // 📦 Itens ou salões exibidos nos cards
  itens: string[] = [
    'Studio Glamour',
    'Espaço da Beleza',
    'Salão Mãe e Filhas',
    'Clínica da Pele',
    'Bronze da Ju',
    'Beleza Natural',
    'La Belle Style'
  ];

  // 🔍 Itens filtrados (resultado da busca)
  itensFiltrados = [...this.itens];

  // 👉 Ao digitar na barra de busca
  filtrar(event: any) {
    const valor = event.detail.value?.toLowerCase() || '';
    this.itensFiltrados = this.itens.filter(item =>
      item.toLowerCase().includes(valor)
    );

    console.log('Filtro aplicado:', valor);
    console.log('Resultados:', this.itensFiltrados);
  }

  // 🧭 Ao clicar em uma categoria
  abrirCategoria(nome: string) {
    console.log('Categoria selecionada:', nome);
    this.router.navigate(['/categoria']);
  }

  // 👤 Navegar para o perfil
  irParaPerfil() {
    this.router.navigate(['/perfil']);
  }
}
