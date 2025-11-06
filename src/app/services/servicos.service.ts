// servicos.service.ts - COM PERSISTÊNCIA NO LOCALSTORAGE

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
  private readonly STORAGE_KEY = 'salao_categorias';
  
  // Dados padrão inicial
  private dadosPadrao: Categoria[] = [
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
  ];

  private categorias$: BehaviorSubject<Categoria[]>;

  constructor() {
    // Carregar dados salvos ou usar dados padrão
    const dadosSalvos = this.carregarDoLocalStorage();
    this.categorias$ = new BehaviorSubject<Categoria[]>(dadosSalvos || this.dadosPadrao);
    
    // Salvar automaticamente quando houver mudanças
    this.categorias$.subscribe(categorias => {
      this.salvarNoLocalStorage(categorias);
    });
  }

  // CARREGAR do localStorage
  private carregarDoLocalStorage(): Categoria[] | null {
    try {
      const dados = localStorage.getItem(this.STORAGE_KEY);
      if (dados) {
        return JSON.parse(dados);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
    return null;
  }

  // SALVAR no localStorage
  private salvarNoLocalStorage(categorias: Categoria[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(categorias));
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  }

  // Obter categorias (Observable para atualizações automáticas)
  getCategorias() {
    return this.categorias$.asObservable();
  }

  // Obter valor atual
  getCategoriasValue() {
    return this.categorias$.value;
  }

  // ADICIONAR nova categoria
  adicionarCategoria(nome: string) {
    const categorias = this.categorias$.value;
    const novaCategoria: Categoria = {
      id: Date.now(),
      nome: nome,
      servicos: []
    };
    this.categorias$.next([...categorias, novaCategoria]);
  }

  // ADICIONAR novo serviço
  adicionarServico(categoriaId: number, servico: Partial<Servico>) {
    const categorias = [...this.categorias$.value];
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
      this.categorias$.next(categorias);
    }
  }

  // ATUALIZAR serviço
  atualizarServico(servicoId: number, dados: Partial<Servico>) {
    const categorias = [...this.categorias$.value];
    
    for (let categoria of categorias) {
      const servico = categoria.servicos.find(s => s.id === servicoId);
      if (servico) {
        if (dados.nome) servico.nome = dados.nome;
        if (dados.preco !== undefined) servico.preco = dados.preco;
        if (dados.tempo) servico.tempo = dados.tempo;
        this.categorias$.next(categorias);
        return true;
      }
    }
    return false;
  }

  // REMOVER serviço
  removerServico(servicoId: number) {
    const categorias = [...this.categorias$.value];
    
    for (let categoria of categorias) {
      const index = categoria.servicos.findIndex(s => s.id === servicoId);
      if (index !== -1) {
        categoria.servicos.splice(index, 1);
        this.categorias$.next(categorias);
        return true;
      }
    }
    return false;
  }

  // REMOVER categoria
  removerCategoria(categoriaId: number) {
    const categorias = this.categorias$.value.filter(c => c.id !== categoriaId);
    this.categorias$.next(categorias);
  }

  // RESETAR para dados padrão (útil para testes)
  resetarDados() {
    this.categorias$.next(this.dadosPadrao);
  }
}