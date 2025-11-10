
// perfil.page.ts - VERSÃO COMPLETA COM PERSISTÊNCIA

import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton, IonLabel, IonItem, IonAvatar, IonIcon, IonList, IonRadioGroup, IonRadio, IonTabBar, IonTabButton, AlertController } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { createOutline, callOutline, mailOutline, keyOutline, lockClosedOutline, homeOutline, calendarOutline, personOutline } from 'ionicons/icons';
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
    IonContent, IonButton, IonLabel, IonItem, IonAvatar, IonIcon, IonList, IonRadioGroup, IonRadio, IonTabBar, IonTabButton, RouterModule, RouterLink
  ]
})
export class PerfilPage implements OnInit {
  private readonly STORAGE_KEY = 'perfil_usuario';

  // Dados do perfil
  nomeUsuario = 'Isabella Pacheco Da Silva';
  telefone = '+55 ** *****-7892';
  email = 'j*****************@gmail.com';
  senhaReal = 'senha123';
  senhaExibida = '*******';
  fotoUrl = '';
  genero = 'feminino';

  constructor(private alertController: AlertController) {
    addIcons({ createOutline, callOutline, mailOutline, keyOutline, lockClosedOutline, homeOutline, calendarOutline, personOutline });
  }

  ngOnInit() {
    // Carregar dados salvos ao iniciar
    this.carregarDados();
  }

  // CARREGAR dados do localStorage
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

  // SALVAR dados no localStorage
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

  // Alterar foto - FUNCIONAL
  async alterarFoto() {
    const alert = await this.alertController.create({
      header: 'Alterar foto de perfil',
      buttons: [
        {
          text: 'Escolher da galeria',
          handler: () => {
            this.escolherDaGaleria();
          }
        },
        {
          text: 'Tirar foto',
          handler: () => {
            this.mostrarToast('Funcionalidade de câmera em desenvolvimento');
          }
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
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  // CORRIGIDO: Escolher foto da galeria
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
          this.salvarDados(); // SALVAR após alterar
          this.mostrarToast('Foto atualizada com sucesso!');
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  }

  // Editar nome
  async editarNome() {
    const alert = await this.alertController.create({
      header: 'Editar nome de usuário',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome de usuário',
          value: this.nomeUsuario
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: (data) => {
            const nome = data.nome?.trim();
            
            if (!nome) {
              this.mostrarToast('O nome não pode estar vazio');
              return false;
            }
            
            if (nome.length < 3) {
              this.mostrarToast('O nome deve ter pelo menos 3 caracteres');
              return false;
            }
            
            if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nome)) {
              this.mostrarToast('O nome deve conter apenas letras');
              return false;
            }
            
            this.nomeUsuario = nome;
            this.salvarDados(); // SALVAR
            this.mostrarToast('Nome atualizado!');
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  // Editar telefone
  async editarTelefone() {
    const alert = await this.alertController.create({
      header: 'Editar número de telefone',
      inputs: [
        {
          name: 'telefone',
          type: 'tel',
          placeholder: '+55 (00) 00000-0000',
          value: this.telefone
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: (data) => {
            const telefone = data.telefone?.trim();
            
            if (!telefone) {
              this.mostrarToast('O telefone não pode estar vazio');
              return false;
            }
            
            const telefoneNumeros = telefone.replace(/\D/g, '');
            if (telefoneNumeros.length < 10 || telefoneNumeros.length > 13) {
              this.mostrarToast('Telefone inválido');
              return false;
            }
            
            this.telefone = telefone;
            this.salvarDados(); // SALVAR
            this.mostrarToast('Telefone atualizado!');
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  // Editar email
  async editarEmail() {
    const alert = await this.alertController.create({
      header: 'Editar endereço de e-mail',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'exemplo@gmail.com',
          value: this.email
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: (data) => {
            const email = data.email?.trim().toLowerCase();
            
            if (!email) {
              this.mostrarToast('O e-mail não pode estar vazio');
              return false;
            }
            
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
              this.mostrarToast('E-mail inválido');
              return false;
            }
            
            const dominiosAceitos = ['@gmail.com', '@hotmail.com', '@outlook.com', '@yahoo.com'];
            const temDominioValido = dominiosAceitos.some(dominio => email.endsWith(dominio));
            
            if (!temDominioValido) {
              this.mostrarToast('Use @gmail.com, @hotmail.com, @outlook.com ou @yahoo.com');
              return false;
            }
            
            this.email = email;
            this.salvarDados(); // SALVAR
            this.mostrarToast('E-mail atualizado!');
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  // Editar senha
  async editarSenha() {
    const alert = await this.alertController.create({
      header: 'Alterar senha',
      inputs: [
        {
          name: 'senhaAtual',
          type: 'password',
          placeholder: 'Senha atual'
        },
        {
          name: 'novaSenha',
          type: 'password',
          placeholder: 'Nova senha (mín. 6 caracteres)'
        },
        {
          name: 'confirmarSenha',
          type: 'password',
          placeholder: 'Confirmar nova senha'
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Alterar',
          handler: (data) => {
            if (data.senhaAtual !== this.senhaReal) {
              this.mostrarToast('Senha atual incorreta!');
              return false;
            }
            
            if (!data.novaSenha || data.novaSenha.length < 6) {
              this.mostrarToast('A nova senha deve ter pelo menos 6 caracteres');
              return false;
            }
            
            if (data.novaSenha === this.senhaReal) {
              this.mostrarToast('A nova senha deve ser diferente da atual');
              return false;
            }
            
            if (data.novaSenha !== data.confirmarSenha) {
              this.mostrarToast('As senhas não coincidem!');
              return false;
            }
            
            if (!/[a-zA-Z]/.test(data.novaSenha) || !/[0-9]/.test(data.novaSenha)) {
              this.mostrarToast('A senha deve conter letras e números');
              return false;
            }
            
            this.senhaReal = data.novaSenha;
            this.senhaExibida = '*'.repeat(data.novaSenha.length);
            this.salvarDados(); // SALVAR
            this.mostrarToast('Senha alterada com sucesso!');
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  async salvar() {
    this.salvarDados();
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      message: 'Alterações salvas com sucesso.',
      buttons: ['OK']
    });
    await alert.present();
  }

  async sair() {
    const alert = await this.alertController.create({
      header: 'Confirmar saída',
      message: 'Deseja realmente sair da sua conta?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Sair',
          handler: () => {
            this.mostrarToast('Você saiu da conta');
          }
        }
      ]
    });
    await alert.present();
  }

  async excluir() {
    const alert = await this.alertController.create({
      header: 'Excluir conta',
      message: 'Tem certeza? Esta ação não pode ser desfeita.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            localStorage.removeItem(this.STORAGE_KEY);
            this.mostrarToast('Conta excluída com sucesso');
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
}