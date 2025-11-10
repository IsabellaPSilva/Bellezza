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
    IonRadioGroup, IonRadio, IonTabBar, IonTabButton, RouterModule, RouterLink
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
    try {
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
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }

  private salvarDados() {
    try {
      const dados: DadosPerfil = {
        nomeUsuario: this.nomeUsuario,
        telefone: this.telefone,
        email: this.email,
        senhaReal: this.senhaReal,
        fotoUrl: this.fotoUrl,
        genero: this.genero
      };
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dados));
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  }

  async alterarFoto() {
    const alert = await this.alertController.create({
      header: 'Alterar foto de perfil',
      buttons: [
        {
          text: 'Escolher da galeria',
          handler: () => this.escolherDaGaleria()
        },
        {
          text: 'Tirar foto',
          handler: () => this.mostrarToast('Funcionalidade de câmera em desenvolvimento')
        },
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
      if (file) {
        if (!file.type.startsWith('image/')) {
          this.mostrarToast('Por favor, selecione uma imagem válida');
          return;
        }
        if (file.size > 5 * 1024 * 1024) {
          this.mostrarToast('A imagem deve ter no máximo 5MB');
          return;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.fotoUrl = e.target.result;
          this.salvarDados();
          this.mostrarToast('Foto atualizada com sucesso!');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }

  async editarNome() {
    const alert = await this.alertController.create({
      header: 'Editar nome de usuário',
      inputs: [{ name: 'nome', type: 'text', value: this.nomeUsuario }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: (data) => {
            const nome = data.nome?.trim();
            if (!nome || nome.length < 3) {
              this.mostrarToast('O nome deve ter pelo menos 3 caracteres');
              return false;
            }
            this.nomeUsuario = nome;
            this.salvarDados();
            this.mostrarToast('Nome atualizado!');
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  async editarTelefone() {
    const alert = await this.alertController.create({
      header: 'Editar telefone',
      inputs: [{ name: 'telefone', type: 'tel', value: this.telefone }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: (data) => {
            const tel = data.telefone?.trim();
            if (!tel) {
              this.mostrarToast('Telefone inválido');
              return false;
            }
            this.telefone = tel;
            this.salvarDados();
            this.mostrarToast('Telefone atualizado!');
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  async editarEmail() {
    const alert = await this.alertController.create({
      header: 'Editar e-mail',
      inputs: [{ name: 'email', type: 'email', value: this.email }],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: (data) => {
            const email = data.email?.trim();
            const emailRegex = /\S+@\S+\.\S+/;
            if (!emailRegex.test(email)) {
              this.mostrarToast('E-mail inválido');
              return false;
            }
            this.email = email;
            this.salvarDados();
            this.mostrarToast('E-mail atualizado!');
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  async editarSenha() {
    const alert = await this.alertController.create({
      header: 'Alterar senha',
      inputs: [
        { name: 'senhaAtual', type: 'password', placeholder: 'Senha atual' },
        { name: 'novaSenha', type: 'password', placeholder: 'Nova senha' },
        { name: 'confirmarSenha', type: 'password', placeholder: 'Confirmar nova senha' }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Alterar',
          handler: (data) => {
            if (data.senhaAtual !== this.senhaReal) {
              this.mostrarToast('Senha atual incorreta');
              return false;
            }
            if (data.novaSenha.length < 6 || data.novaSenha !== data.confirmarSenha) {
              this.mostrarToast('Verifique a nova senha');
              return false;
            }
            this.senhaReal = data.novaSenha;
            this.senhaExibida = '*'.repeat(data.novaSenha.length);
            this.salvarDados();
            this.mostrarToast('Senha alterada com sucesso');
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  async sair() {
    const alert = await this.alertController.create({
      header: 'Sair da conta',
      message: 'Deseja realmente sair?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Sair',
          handler: () => this.mostrarToast('Você saiu da conta')
        }
      ]
    });
    await alert.present();
  }

  async excluir() {
    const alert = await this.alertController.create({
      header: 'Excluir conta',
      message: 'Tem certeza que deseja excluir?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            localStorage.removeItem(this.STORAGE_KEY);
            this.mostrarToast('Conta excluída');
          }
        }
      ]
    });
    await alert.present();
  }

  async mostrarToast(msg: string) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK'],
      cssClass: 'toast-alert'
    });
    await alert.present();
    setTimeout(() => alert.dismiss(), 2000);
  }
}
