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
import { ServicosService, Categoria, Servico } from '../services/servicos.service';

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
    private alertController: AlertController,
    private servicosService: ServicosService
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
    this.servicosService.getCategorias().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    });
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
              this.servicosService.adicionarCategoria(data.nome.trim());
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
              this.servicosService.adicionarServico(categoria.id, {
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
              this.servicosService.atualizarServico(servico.id, { nome: data.nome.trim() });
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
              this.servicosService.atualizarServico(servico.id, {
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