import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton, IonIcon, IonLabel, IonTabBar, IonTabButton, AlertController } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  arrowBack, shareOutline,
  homeOutline, calendarOutline, personOutline
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
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonIcon, IonLabel, IonTabBar, IonTabButton, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservaPage implements OnInit {
  categorias: Categoria[] = [];
  combos: Servico[] = [];
  servicosCabelo: Servico[] = [];
 
  constructor(
    private alertController: AlertController
  ) {
    addIcons({
      arrowBack,
      shareOutline,
      homeOutline,
      calendarOutline,
      personOutline
    });
  }
 
  ngOnInit() {
    this.carregarServicos();
  }
 
  // CARREGAR SERVIÇOS DO LOCAL STORAGE
  private carregarServicos() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const dados = localStorage.getItem('categorias-servicos');
      this.categorias = dados ? JSON.parse(dados) : this.getCategoriasIniciais();
    } else {
      this.categorias = this.getCategoriasIniciais();
    }
    this.atualizarServicos();
  }
 
  // ATUALIZAR LISTAS DE SERVIÇOS
  private atualizarServicos() {
    const categoriaCombos = this.categorias.find(c => c.nome === 'Combos');
    const categoriaCabelo = this.categorias.find(c => c.nome === 'Cabelo');
   
    this.combos = categoriaCombos ? categoriaCombos.servicos : [];
    this.servicosCabelo = categoriaCabelo ? categoriaCabelo.servicos : [];
  }
 
  // CATEGORIAS INICIAIS (MESMAS DO reservaP)
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
          text: 'Confira os serviços do Salão Mãe & Filhas!',
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
        this.mostrarDialogoLink(link);
      }
    } else {
      this.mostrarDialogoLink(link);
    }
  }
 
  async mostrarDialogoLink(link: string) {
    const alert = await this.alertController.create({
      header: 'Compartilhar',
      message: `Copie o link:\n\n${link}`,
      buttons: ['OK']
    });
    await alert.present();
  }
 
  async reservar(servico: Servico) {
    const alert = await this.alertController.create({
      header: 'Confirmar Reserva',
      message: `Deseja reservar: ${servico.nome}?\nValor: ${this.formatarPreco(servico.preco)}`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Reservar',
          handler: () => {
            this.mostrarToast('Reserva realizada com sucesso!');
          }
        }
      ]
    });
    await alert.present();
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
    return preco.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
 
  // ATUALIZAR OS SERVIÇOS QUANDO A PÁGINA FOR ABERTA NOVAMENTE
  ionViewWillEnter() {
    this.carregarServicos();
  }
}