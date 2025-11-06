// categoria.page.ts - MANTENDO SUA ESTRUTURA

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Salao {
  nome: string;
  avaliacao: number;
  avaliacoes: number;
  logo: string;
  imagemDestaque: string;
  categorias: string[];
}

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, FormsModule]
})
export class CategoriaPage {
  categoriaSelecionada: string = 'Unhas';
  termoBusca: string = '';
  ordenacao: string = 'recomendacao';

  // Dados completos dos salões (com imagens únicas)
  todosOsSaloes: Salao[] = [
    { 
      nome: 'Salão Mãe e Filhas', 
      avaliacao: 5.0, 
      avaliacoes: 570,
      logo: 'assets/SalãoMãeeFilhas.jpeg',
      imagemDestaque: 'assets/MaeeFilhas2.png',
      categorias: ['Unhas', 'Cabelo', 'Sobrancelhas']
    },
    { 
      nome: 'La_belle_style', 
      avaliacao: 4.9, 
      avaliacoes: 450,
      logo: 'assets/LaBelleStyleP.jpeg',
      imagemDestaque: 'assets/LaBelleStyle.png',
      categorias: ['Unhas', 'Maquiagem', 'Cílios']
    },
    { 
      nome: 'Studio Glamour', 
      avaliacao: 4.8, 
      avaliacoes: 390,
      logo: 'assets/StudioGlamourLogo (2).jpeg',
      imagemDestaque: 'assets/StudioGlamour.png',
      categorias: ['Cabelo', 'Bronze', 'Depilação']
    },
    { 
      nome: 'Espaço Elegance', 
      avaliacao: 4.7, 
      avaliacoes: 320,
      logo: 'assets/EspacoElegance.png',
      imagemDestaque: 'assets/EspacoElegance2.png',
      categorias: ['Massagens', 'Pele', 'Bronze']
    },
    { 
      nome: 'Beleza Pura', 
      avaliacao: 4.9, 
      avaliacoes: 412,
      logo: 'assets/beleza pura.png',
      imagemDestaque: 'assets/beleza pura.png',
      categorias: ['Sobrancelhas', 'Cílios', 'Maquiagem']
    }
  ];

  saloes: Salao[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.categoriaSelecionada = params['nome'] || 'Unhas';
      this.filtrarSaloes();
    });
  }

  ngOnInit() {
    this.filtrarSaloes();
  }

  // NOVO: Busca funcional
  buscar(event: any) {
    this.termoBusca = event.target.value || '';
    this.filtrarSaloes();
  }

  // NOVO: Selecionar categoria
  selecionarCategoria(categoria: string) {
    this.categoriaSelecionada = categoria;
    this.filtrarSaloes();
  }

  // NOVO: Filtrar salões por categoria e busca
  filtrarSaloes() {
    this.saloes = this.todosOsSaloes.filter(salao => {
      // Filtrar por categoria
      const contemCategoria = salao.categorias.includes(this.categoriaSelecionada);
      
      // Filtrar por busca
      const contemBusca = !this.termoBusca || 
        salao.nome.toLowerCase().includes(this.termoBusca.toLowerCase());
      
      return contemCategoria && contemBusca;
    });

    this.ordenarSaloes();
  }

  // NOVO: Mudar ordenação (clicável)
  mudarOrdenacao() {
    const opcoes = ['recomendacao', 'avaliacoes', 'alfabetica'];
    const indexAtual = opcoes.indexOf(this.ordenacao);
    this.ordenacao = opcoes[(indexAtual + 1) % opcoes.length];
    this.ordenarSaloes();
  }

  // NOVO: Ordenar salões
  ordenarSaloes() {
    switch(this.ordenacao) {
      case 'recomendacao':
        this.saloes.sort((a, b) => b.avaliacao - a.avaliacao);
        break;
      case 'avaliacoes':
        this.saloes.sort((a, b) => b.avaliacoes - a.avaliacoes);
        break;
      case 'alfabetica':
        this.saloes.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
    }
  }

  // NOVO: Nome da ordenação exibido
  getNomeOrdenacao(): string {
    const nomes: { [key: string]: string } = {
      'recomendacao': 'recomendação',
      'avaliacoes': 'avaliações',
      'alfabetica': 'A-Z'
    };
    return nomes[this.ordenacao];
  }

  irParaPerfil() {
    this.router.navigate(['/perfil']);
  }
}