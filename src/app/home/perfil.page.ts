// perfil.page.ts - VERSÃO MELHORADA COM VALIDAÇÕES

import { Component } from '@angular/core';
import { IonContent, IonButton, IonLabel, IonItem, IonAvatar, IonIcon, IonList, IonRadioGroup, IonRadio, IonTabBar, IonTabButton, AlertController } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { createOutline, callOutline, mailOutline, keyOutline, lockClosedOutline, homeOutline, calendarOutline, personOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [
     IonContent, IonButton, IonLabel, IonItem, IonAvatar, IonIcon, IonList, IonRadioGroup, IonRadio, IonTabBar, IonTabButton, RouterModule, RouterLink
  ]
})
export class PerfilPage {
  // Dados do perfil
  nomeUsuario = 'Isabella Pacheco Da Silva';
  telefone = '+55 ** *****-7892';
  email = 'j*****************@gmail.com';
  senhaReal = 'senha123'; // Senha real armazenada (em produção, viria do backend)
  senhaExibida = '*******';
  fotoUrl = '';

  constructor(private alertController: AlertController) {
    addIcons({ createOutline, callOutline, mailOutline, keyOutline, lockClosedOutline, homeOutline, calendarOutline, personOutline });
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
            console.log('Abrir câmera');
            this.mostrarToast('Funcionalidade de câmera em desenvolvimento');
          }
        },
        {
          text: 'Remover foto',
          role: 'destructive',
          handler: () => {
            this.fotoUrl = '';
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

  // CORRIGIDO: Escolher foto da galeria agora funciona!
  escolherDaGaleria() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        // Validar tipo de arquivo
        if (!file.type.startsWith('image/')) {
          this.mostrarToast('Por favor, selecione uma imagem válida');
          return;
        }
        
        // Validar tamanho (máximo 5MB)
        if (file.size > 5 * 1024 * 1024) {
          this.mostrarToast('A imagem deve ter no máximo 5MB');
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.fotoUrl = e.target.result;
          this.mostrarToast('Foto atualizada com sucesso!');
        };
        reader.readAsDataURL(file);
      }
    };
    
    input.click();
  }

  // Editar nome - COM VALIDAÇÃO
  async editarNome() {
    const alert = await this.alertController.create({
      header: 'Editar nome de usuário',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome de usuário',
          value: this.nomeUsuario,
          attributes: {
            minlength: 3,
            maxlength: 50
          }
        }
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: (data) => {
            const nome = data.nome?.trim();
            
            // Validações
            if (!nome) {
              this.mostrarToast('O nome não pode estar vazio');
              return false;
            }
            
            if (nome.length < 3) {
              this.mostrarToast('O nome deve ter pelo menos 3 caracteres');
              return false;
            }
            
            if (nome.length > 50) {
              this.mostrarToast('O nome deve ter no máximo 50 caracteres');
              return false;
            }
            
            // Validar se contém apenas letras e espaços
            if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(nome)) {
              this.mostrarToast('O nome deve conter apenas letras');
              return false;
            }
            
            this.nomeUsuario = nome;
            this.mostrarToast('Nome atualizado!');
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  // CORRIGIDO: Editar telefone - COM VALIDAÇÃO
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
            
            // Validações
            if (!telefone) {
              this.mostrarToast('O telefone não pode estar vazio');
              return false;
            }
            
            // Validar formato brasileiro (aceita vários formatos)
            const telefoneNumeros = telefone.replace(/\D/g, '');
            
            if (telefoneNumeros.length < 10 || telefoneNumeros.length > 13) {
              this.mostrarToast('Telefone inválido. Use o formato: +55 (00) 00000-0000');
              return false;
            }
            
            this.telefone = telefone;
            this.mostrarToast('Telefone atualizado!');
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  // CORRIGIDO: Editar email - COM VALIDAÇÃO COMPLETA
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
            
            // Validações
            if (!email) {
              this.mostrarToast('O e-mail não pode estar vazio');
              return false;
            }
            
            // Regex completo para validar e-mail
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!emailRegex.test(email)) {
              this.mostrarToast('E-mail inválido. Use o formato: exemplo@gmail.com');
              return false;
            }
            
            // Validar domínios aceitos
            const dominiosAceitos = ['@gmail.com', '@hotmail.com', '@outlook.com', '@yahoo.com'];
            const temDominioValido = dominiosAceitos.some(dominio => email.endsWith(dominio));
            
            if (!temDominioValido) {
              this.mostrarToast('Use um e-mail @gmail.com, @hotmail.com, @outlook.com ou @yahoo.com');
              return false;
            }
            
            this.email = email;
            this.mostrarToast('E-mail atualizado!');
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  // CORRIGIDO: Editar senha - COM VALIDAÇÃO DE SENHA ATUAL
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
            // CORRIGIDO: Validar senha atual
            if (data.senhaAtual !== this.senhaReal) {
              this.mostrarToast('Senha atual incorreta!');
              return false;
            }
            
            // Validar nova senha
            if (!data.novaSenha || data.novaSenha.length < 6) {
              this.mostrarToast('A nova senha deve ter pelo menos 6 caracteres');
              return false;
            }
            
            // Validar se a nova senha é diferente da atual
            if (data.novaSenha === this.senhaReal) {
              this.mostrarToast('A nova senha deve ser diferente da atual');
              return false;
            }
            
            // Validar se as senhas coincidem
            if (data.novaSenha !== data.confirmarSenha) {
              this.mostrarToast('As senhas não coincidem!');
              return false;
            }
            
            // Validar força da senha (pelo menos 1 letra e 1 número)
            if (!/[a-zA-Z]/.test(data.novaSenha) || !/[0-9]/.test(data.novaSenha)) {
              this.mostrarToast('A senha deve conter letras e números');
              return false;
            }
            
            // Atualizar senha
            this.senhaReal = data.novaSenha;
            this.senhaExibida = '*'.repeat(data.novaSenha.length);
            this.mostrarToast('Senha alterada com sucesso!');
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  async salvar() {
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      message: 'Alterações salvas com sucesso.',
      buttons: ['OK']
    });
    await alert.present();
    console.log("Dados salvos:", { 
      nome: this.nomeUsuario, 
      telefone: this.telefone, 
      email: this.email 
    });
  }

  async gerenciar() {
    const alert = await this.alertController.create({
      header: 'Gerenciar Chaves de Acesso',
      message: 'Você possui 1 chave de acesso configurada.',
      buttons: [
        {
          text: 'Adicionar nova chave',
          handler: () => {
            console.log('Adicionar nova chave');
            this.mostrarToast('Funcionalidade em desenvolvimento');
          }
        },
        {
          text: 'Ver chaves existentes',
          handler: () => {
            console.log('Ver chaves');
            this.mostrarToast('Funcionalidade em desenvolvimento');
          }
        },
        {
          text: 'Fechar',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }

  async sair() {
    const alert = await this.alertController.create({
      header: 'Confirmar saída',
      message: 'Deseja realmente sair da sua conta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sair',
          handler: () => {
            console.log('Usuário saiu');
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
      message: 'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            console.log('Conta excluída');
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