import { Component, OnInit } from '@angular/core';
import {
  IonContent, IonButton, IonLabel, IonItem, IonAvatar, IonIcon, IonList,
  IonRadioGroup, IonRadio, IonTabBar, IonTabButton, AlertController
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  createOutline, callOutline, mailOutline, keyOutline, lockClosedOutline,
  homeOutline, calendarOutline, personOutline
} from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // <-- ADICIONE ISTO


interface DadosPerfil {
  nomeUsuario: string;
  telefone: string;
  email: string;
  senhaReal: string;
  fotoUrl: string;
  genero: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent, IonButton, IonLabel, IonItem, IonAvatar, IonIcon, IonList,
    IonRadioGroup, IonRadio, IonTabBar, IonTabButton, RouterModule, RouterLink,FormsModule  // <-- OBRIGATÓRIO PARA ngModel

  ]
})
export class PerfilPage implements OnInit {
  private readonly STORAGE_KEY = 'perfil_usuario';

  nomeUsuario = 'Isabella Pacheco Da Silva';
  telefone = '+55 ** *****-7892';
  email = 'j*****************@gmail.com';
  senhaReal = 'senha123';
  senhaExibida = '*******';
  fotoUrl = '';
  genero = 'feminino';

  constructor(private alertController: AlertController) {
    addIcons({
      createOutline, callOutline, mailOutline, keyOutline,
      lockClosedOutline, homeOutline, calendarOutline, personOutline
    });
  }

  ngOnInit() {
    this.carregarDados();
  }

  private carregarDados() {
    const dadosSalvos = localStorage.getItem(this.STORAGE_KEY);
    if (dadosSalvos) {
      const dados: DadosPerfil = JSON.parse(dadosSalvos);
      this.nomeUsuario = dados.nomeUsuario;
      this.telefone = dados.telefone;
      this.email = dados.email;
      this.senhaReal = dados.senhaReal;
      this.fotoUrl = dados.fotoUrl;
      this.genero = dados.genero;
      this.senhaExibida = '*'.repeat(dados.senhaReal.length);
    }
  }

  private salvarDados() {
    const dados: DadosPerfil = {
      nomeUsuario: this.nomeUsuario,
      telefone: this.telefone,
      email: this.email,
      senhaReal: this.senhaReal,
      fotoUrl: this.fotoUrl,
      genero: this.genero
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dados));
  }

  async alterarFoto() {
    const alert = await this.alertController.create({
      header: 'Alterar foto de perfil',
      buttons: [
        { text: 'Escolher da galeria', handler: () => this.escolherDaGaleria() },
        { text: 'Tirar foto', handler: () => this.mostrarToast('Câmera em desenvolvimento') },
        {
          text: 'Remover foto',
          role: 'destructive',
          handler: () => {
            this.fotoUrl = '';
            this.salvarDados();
            this.mostrarToast('Foto removida');
          }
        },
        { text: 'Cancelar', role: 'cancel' }
      ]
    });
    await alert.present();
  }

  escolherDaGaleria() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.fotoUrl = e.target.result;
        this.salvarDados();
        this.mostrarToast('Foto atualizada!');
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  async editarNome() { /* ... igual ao seu ... */ }
  async editarTelefone() { /* ... igual ao seu ... */ }
  async editarEmail() { /* ... igual ao seu ... */ }
  async editarSenha() { /* ... igual ao seu ... */ }

  // ✅ SAIR corrigido (não sai antes do alerta)
  async sair() {
    const alert = await this.alertController.create({
      header: 'Sair da conta',
      message: 'Deseja realmente sair?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Sair',
          handler: () => {
            this.mostrarToast('Você saiu da conta');
            setTimeout(() => {
              window.location.href = '/home';
            }, 400);
          }
        }
      ]
    });
    await alert.present();
  }

  // 💣 Excluir TOTAL sem pedir confirmação
  excluir() {
    localStorage.removeItem(this.STORAGE_KEY);
    window.location.href = '/home';
  }

  async mostrarToast(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: [],
      cssClass: 'toast-alert'
    });
    await alert.present();
    setTimeout(() => alert.dismiss(), 1800);
  }
}
