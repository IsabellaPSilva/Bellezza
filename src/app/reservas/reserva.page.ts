import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton, IonIcon, IonLabel, IonTabBar, IonTabButton, AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
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
  imports: [CommonModule, IonContent, IonButton, IonIcon, IonLabel, IonTabBar, IonTabButton],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReservaPage implements OnInit {
  categorias: Categoria[] = [];
 
  constructor(
    private alertController: AlertController,
    private router: Router
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
 
  // CARREGAR TODAS AS CATEGORIAS DO LOCAL STORAGE
  private carregarServicos() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const dados = localStorage.getItem('categorias-servicos');
      this.categorias = dados ? JSON.parse(dados) : this.getCategoriasIniciais();
    } else {
      this.categorias = this.getCategoriasIniciais();
    }
  }
 
  // CATEGORIAS INICIAIS - MANTER COMPATÍVEL COM reservaP
  private getCategoriasIniciais(): Categoria[] {
    return [
      {
        id: '1',
        nome: 'Combos',
        servicos: [
          { id: '1', nome: 'Matheus faço completo', preco: 10.00, tempo: '24hr' },
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
 
  // MÉTODO PARA RESERVAR SERVIÇO
  reservarServico(servico: Servico) {
    console.log('🔄 Salvando serviço e navegando para calendário:', servico);
   
    // Salva também no localStorage para compatibilidade
    localStorage.setItem('servicoSelecionado', JSON.stringify(servico));
   
    // Navega para a página do calendário passando o serviço via state
    this.router.navigate(['/calendario'], {
      state: {
        servicoSelecionado: {
          nome: servico.nome,
          preco: servico.preco,
          tempo: servico.tempo
        }
      }
    });
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