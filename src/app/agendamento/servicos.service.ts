// src/app/services/servicos.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Servico {
  id: number;
  nome: string;
  preco: number;
  tempo: string;
  categoria: string;
}

export interface Categoria {
  id: number;
  nome: string;
  servicos: Servico[];
}

@Injectable({
  providedIn: 'root'
})
export class ServicosService {
  private categorias$ = new BehaviorSubject<Categoria[]>([
    {
      id: 1,
      nome: 'Combos',
      servicos: [
        { id: 1, nome: 'Aplique + unha', preco: 830.00, tempo: '3hr', categoria: 'combos' },
        { id: 2, nome: 'Unha em gel + trança', preco: 830.00, tempo: '3hr', categoria: 'combos' }
      ]
    },
    {
      id: 2,
      nome: 'Cabelo',
      servicos: [
        { id: 3, nome: 'Finalização', preco: 150.00, tempo: '45m', categoria: 'cabelo' },
        { id: 4, nome: 'Alisamento', preco: 150.00, tempo: '1hr', categoria: 'cabelo' },
        { id: 5, nome: 'Tranças', preco: 280.00, tempo: '2/3hr', categoria: 'cabelo' },
        { id: 6, nome: 'Aplique', preco: 800.00, tempo: '2hr', categoria: 'cabelo' },
        { id: 7, nome: 'Cabelo', preco: 350.00, tempo: '2hr', categoria: 'cabelo' }
      ]
    }
  ]);

  getCategorias() {
    return this.categorias$.asObservable();
  }

  getCategoriasValue() {
    return this.categorias$.value;
  }

  adicionarCategoria(nome: string) {
    const categorias = this.categorias$.value;
    const novaCategoria: Categoria = {
      id: Date.now(),
      nome: nome,
      servicos: []
    };
    this.categorias$.next([...categorias, novaCategoria]);
  }

  adicionarServico(categoriaId: number, servico: Partial<Servico>) {
    const categorias = this.categorias$.value;
    const categoria = categorias.find(c => c.id === categoriaId);
    
    if (categoria) {
      const novoServico: Servico = {
        id: Date.now(),
        nome: servico.nome || 'Novo Serviço',
        preco: servico.preco || 0,
        tempo: servico.tempo || '0min',
        categoria: categoria.nome.toLowerCase()
      };
      categoria.servicos.push(novoServico);
      this.categorias$.next([...categorias]);
    }
  }

  atualizarServico(servicoId: number, dados: Partial<Servico>) {
    const categorias = this.categorias$.value;
    
    for (let categoria of categorias) {
      const servico = categoria.servicos.find(s => s.id === servicoId);
      if (servico) {
        if (dados.nome) servico.nome = dados.nome;
        if (dados.preco !== undefined) servico.preco = dados.preco;
        if (dados.tempo) servico.tempo = dados.tempo;
        this.categorias$.next([...categorias]);
        return true;
      }
    }
    return false;
  }

  removerServico(servicoId: number) {
    const categorias = this.categorias$.value;
    
    for (let categoria of categorias) {
      const index = categoria.servicos.findIndex(s => s.id === servicoId);
      if (index !== -1) {
        categoria.servicos.splice(index, 1);
        this.categorias$.next([...categorias]);
        return true;
      }
    }
    return false;
  }

  removerCategoria(categoriaId: number) {
    const categorias = this.categorias$.value.filter(c => c.id !== categoriaId);
    this.categorias$.next(categorias);
  }
}