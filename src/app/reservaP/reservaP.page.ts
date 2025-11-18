// reservaP.page.ts - VERSÃO PROFISSIONAL (Tela 1)
 
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonIcon, IonLabel, IonTabBar, IonTabButton, AlertController } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  shareOutline, addCircleOutline,
  calendarOutline, personOutline, storefrontOutline
} from 'ionicons/icons';
 
export interface Servico {
  id: string;
  nome: string;
  preco: number;
  tempo: string;
}
 
export interface Categoria {
  id: string;
  nome: string;
  servicos: Servico[];
}
 
@Component({
  selector: 'app-reserva-p',
  templateUrl: './reservaP.page.html',
  styleUrls: ['./reservaP.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, IonLabel, IonTabBar, IonTabButton, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservaPPage implements OnInit {
  categorias: Categoria[] = [];
 
  constructor(
    private alertController: AlertController
  ) {
    addIcons({
      shareOutline,
      addCircleOutline,
      calendarOutline,
      personOutline,
      storefrontOutline
    });
  }
 
  ngOnInit() {
    this.carregarCategorias();
  }
 
  // CARREGAR CATEGORIAS DO LOCAL STORAGE
  private carregarCategorias() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const dados = localStorage.getItem('categorias-servicos');
      this.categorias = dados ? JSON.parse(dados) : this.getCategoriasIniciais();
    } else {
      this.categorias = this.getCategoriasIniciais();
    }
  }
 
  // SALVAR CATEGORIAS NO LOCAL STORAGE
  private salvarCategorias() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('categorias-servicos', JSON.stringify(this.categorias));
    }
  }
 
  // CATEGORIAS INICIAIS
  private getCategoriasIniciais(): Categoria[] {
    return [
      {
        id: '1',
        nome: 'Combos',
        servicos: [
          { id: '1', nome: 'Combo Completo', preco: 120, tempo: '2h' },
          { id: '2', nome: 'Combo Básico', preco: 80, tempo: '1h' }
        ]
      },
      {
        id: '2',
        nome: 'Cabelo',
        servicos: [
          { id: '3', nome: 'Corte', preco: 40, tempo: '30min' },
          { id: '4', nome: 'Coloração', preco: 60, tempo: '1h' }
        ]
      }
    ];
  }
 
  async compartilhar() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Salão Mãe & Filhas',
          text: 'Confira meus serviços!',
          url: window.location.href
        });
      } catch (error) {
        if ((error as any).name !== 'AbortError') {
          this.copiarLink();
        }
      }
    } else {
      this.copiarLink();
    }
  }
 
  async copiarLink() {
    const link = window.location.href;
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(link);
        this.mostrarToast('Link copiado!');
      } catch {
        const alert = await this.alertController.create({
          header: 'Compartilhar',
          message: `Link: ${link}`,
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }
 
  // ADICIONAR NOVA CATEGORIA
  async adicionarCategoria() {
    const alert = await this.alertController.create({
      header: 'Nova Categoria',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Ex: Manicure, Pedicure...'
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Adicionar',
          handler: (data) => {
            if (data.nome?.trim()) {
              this.adicionarCategoriaLocal(data.nome.trim());
              this.mostrarToast('Categoria adicionada!');
              return true;
            }
            return false;
          }
        }
      ]
    });
    await alert.present();
  }
 
  private adicionarCategoriaLocal(nome: string) {
    const novaCategoria: Categoria = {
      id: Date.now().toString(),
      nome: nome,
      servicos: []
    };
    this.categorias.push(novaCategoria);
    this.salvarCategorias();
  }
 
  // ADICIONAR NOVO SERVIÇO
  async adicionarServico(categoria: Categoria) {
    const alert = await this.alertController.create({
      header: `Novo Serviço - ${categoria.nome}`,
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome do serviço'
        },
        {
          name: 'preco',
          type: 'number',
          placeholder: 'Preço (R$)'
        },
        {
          name: 'tempo',
          type: 'text',
          placeholder: 'Tempo (ex: 1hr, 45min)'
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Adicionar',
          handler: (data) => {
            if (data.nome?.trim()) {
              this.adicionarServicoLocal(categoria.id, {
                nome: data.nome.trim(),
                preco: parseFloat(data.preco) || 0,
                tempo: data.tempo || '0min'
              });
              this.mostrarToast('Serviço adicionado!');
              return true;
            }
            return false;
          }
        }
      ]
    });
    await alert.present();
  }
 
  private adicionarServicoLocal(categoriaId: string, servico: Omit<Servico, 'id'>) {
    this.categorias = this.categorias.map(categoria => {
      if (categoria.id === categoriaId) {
        const novoServico: Servico = {
          ...servico,
          id: Date.now().toString()
        };
        return {
          ...categoria,
          servicos: [...categoria.servicos, novoServico]
        };
      }
      return categoria;
    });
    this.salvarCategorias();
  }
 
  // EDITAR NOME DO SERVIÇO
  async editarServico(servico: Servico) {
    const alert = await this.alertController.create({
      header: 'Editar Serviço',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome do serviço',
          value: servico.nome
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: (data) => {
            if (data.nome?.trim()) {
              this.atualizarServicoLocal(servico.id, { nome: data.nome.trim() });
              this.mostrarToast('Serviço atualizado!');
              return true;
            }
            return false;
          }
        }
      ]
    });
    await alert.present();
  }
 
  // EDITAR PREÇO DO SERVIÇO
  async editarPreco(servico: Servico) {
    const alert = await this.alertController.create({
      header: 'Editar Preço',
      inputs: [
        {
          name: 'preco',
          type: 'number',
          placeholder: 'Preço (R$)',
          value: servico.preco.toString()
        },
        {
          name: 'tempo',
          type: 'text',
          placeholder: 'Tempo',
          value: servico.tempo
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: (data) => {
            if (data.preco) {
              this.atualizarServicoLocal(servico.id, {
                preco: parseFloat(data.preco),
                tempo: data.tempo || servico.tempo
              });
              this.mostrarToast('Preço atualizado!');
              return true;
            }
            return false;
          }
        }
      ]
    });
    await alert.present();
  }
 
  private atualizarServicoLocal(servicoId: string, atualizacoes: Partial<Servico>) {
    this.categorias = this.categorias.map(categoria => ({
      ...categoria,
      servicos: categoria.servicos.map(servico =>
        servico.id === servicoId ? { ...servico, ...atualizacoes } : servico
      )
    }));
    this.salvarCategorias();
  }
 
  // EXCLUIR SERVIÇO
  async excluirServico(servico: Servico) {
    const alert = await this.alertController.create({
      header: 'Excluir Serviço',
      message: `Tem certeza que deseja excluir "${servico.nome}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.excluirServicoLocal(servico.id);
            this.mostrarToast('Serviço excluído!');
          }
        }
      ]
    });
    await alert.present();
  }
 
  private excluirServicoLocal(servicoId: string) {
    this.categorias = this.categorias.map(categoria => ({
      ...categoria,
      servicos: categoria.servicos.filter(servico => servico.id !== servicoId)
    }));
    this.salvarCategorias();
  }
 
  async mostrarToast(mensagem: string) {
    const alert = await this.alertController.create({
      message: mensagem,
      buttons: ['OK'],
      cssClass: 'toast-alert'
    });
    await alert.present();
    setTimeout(() => alert.dismiss(), 2000);
  }
 
  formatarPreco(preco: number): string {
    if (preco === 0) return 'R$ 0,00';
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
}