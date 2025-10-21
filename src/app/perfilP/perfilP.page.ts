import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonButton, IonIcon, IonLabel, IonTabBar, IonTabButton,
  IonList, IonItem, IonAvatar, IonRadioGroup, IonRadio,
  AlertController, ActionSheetController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  createOutline, callOutline, mailOutline, keyOutline, lockClosedOutline,
  homeOutline, calendarOutline, personOutline,
  logoInstagram, logoFacebook, logoWhatsapp
} from 'ionicons/icons';
 
@Component({
  selector: 'app-perfil-p',
  templateUrl: './perfilP.page.html',
  styleUrls: ['./perfilP.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PerfilPPage {
  // Dados do perfil
  perfil = {
    nomeUsuario: 'Isabella Pacheco Da Silva',
    nomeEmpresa: 'Salão Mãe e Filhas',
    profissao: 'Cabeleiro e Manicure',
    endereco: 'Esquina',
    telefone: '+55 ** *****-7892',
    email: 'j*****************@gmail.com',
    descricao: 'Salão de beleza Mãe & Filhas, é um salão família. voltada para o público feminino, com especialidade em cabelos afros. atendimento com hora marcada !!',
    senha: '*******',
    genero: 'feminino',
    fotoUrl: ''
  };
 
  // Redes sociais
  redesSociais = {
    instagram: '',
    facebook: '',
    whatsapp: ''
  };
 
  // Controle dos modais
  modalAberto = {
    campo: false,
    redeSocial: false
  };
 
  campoEditando = {
    nome: '',
    valor: '',
    tipo: 'text'
  };
 
  redeSocialEditando = {
    nome: '',
    valor: '',
    placeholder: ''
  };
 
  constructor(
    private alertController: AlertController,
    private actionSheetController: ActionSheetController
  ) {
    // Registrar ícones
    addIcons({
      createOutline, callOutline, mailOutline, keyOutline, lockClosedOutline,
      homeOutline, calendarOutline, personOutline,
      logoInstagram, logoFacebook, logoWhatsapp
    });
  }
 
  // ========== EDIÇÃO DE CAMPOS (AMARELO) ==========
  async editarCampo(campo: string, valorAtual: string, tipo: string = 'text') {
    const nomesAmigaveis: { [key: string]: string } = {
      nomeUsuario: 'Nome de usuário',
      nomeEmpresa: 'Nome da empresa',
      profissao: 'Profissão',
      endereco: 'Endereço da empresa',
      telefone: 'Número de telefone',
      email: 'Endereço de e-mail',
      descricao: 'Descrição da empresa',
      senha: 'Senha'
    };
 
    // Definir limites de caracteres por campo
    const limites: { [key: string]: number } = {
      nomeUsuario: 50,
      nomeEmpresa: 60,
      profissao: 40,
      endereco: 100,
      telefone: 20,
      email: 80,
      descricao: 300,
      senha: 30
    };
 
    const alert = await this.alertController.create({
      header: `Editar ${nomesAmigaveis[campo]}`,
      cssClass: 'custom-alert',
      inputs: [
        {
          name: 'valor',
          type: tipo === 'textarea' ? 'textarea' : tipo === 'password' ? 'password' : 'text',
          placeholder: `Digite ${nomesAmigaveis[campo].toLowerCase()}`,
          value: valorAtual,
          attributes: {
            maxlength: limites[campo]
          }
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'alert-button-cancel'
        },
        {
          text: 'Salvar',
          cssClass: 'alert-button-confirm',
          handler: (data) => {
            if (data.valor && data.valor.trim() !== '') {
              (this.perfil as any)[campo] = data.valor;
              this.mostrarToast(`${nomesAmigaveis[campo]} atualizado com sucesso!`);
            }
          }
        }
      ]
    });
 
    await alert.present();
  }
 
  // ========== REDES SOCIAIS (VERMELHO) ==========
  async abrirModalRedeSocial(rede: 'instagram' | 'facebook' | 'whatsapp') {
    const placeholders = {
      instagram: 'https://instagram.com/seuperfil',
      facebook: 'https://facebook.com/seuperfil',
      whatsapp: 'https://wa.me/5541999999999'
    };
 
    const nomes = {
      instagram: 'Instagram',
      facebook: 'Facebook',
      whatsapp: 'WhatsApp'
    };
 
    const alert = await this.alertController.create({
      header: `Adicionar link do ${nomes[rede]}`,
      inputs: [
        {
          name: 'link',
          type: 'url',
          placeholder: placeholders[rede],
          value: this.redesSociais[rede]
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salvar',
          handler: (data) => {
            if (data.link) {
              this.redesSociais[rede] = data.link;
              this.mostrarToast(`Link do ${nomes[rede]} salvo com sucesso!`);
            }
          }
        }
      ]
    });
 
    await alert.present();
  }
 
  // ========== FOTO DE PERFIL (AZUL) ==========
  async alterarFoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Alterar foto de perfil',
      buttons: [
        {
          text: 'Escolher da galeria',
          icon: 'images-outline',
          handler: () => {
            this.selecionarDaGaleria();
          }
        },
        {
          text: 'Tirar foto',
          icon: 'camera-outline',
          handler: () => {
            this.tirarFoto();
          }
        },
        {
          text: 'Remover foto atual',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.removerFoto();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
 
    await actionSheet.present();
  }
 
  selecionarDaGaleria() {
    // Em produção, usar Capacitor Camera Plugin ou File Picker
    // Simulação: criar um input file temporário
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.perfil.fotoUrl = e.target.result;
          this.mostrarToast('Foto atualizada com sucesso!');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }
 
  tirarFoto() {
    // Em produção, usar Capacitor Camera Plugin
    this.mostrarToast('Funcionalidade de câmera em desenvolvimento');
    // Simulação com imagem de exemplo
    console.log('Abrindo câmera...');
  }
 
  removerFoto() {
    this.perfil.fotoUrl = '';
    this.mostrarToast('Foto removida');
  }
 
  // ========== AÇÕES PRINCIPAIS ==========
  async salvar() {
    const alert = await this.alertController.create({
      header: 'Sucesso!',
      message: 'Alterações salvas com sucesso.',
      buttons: ['OK']
    });
    await alert.present();
    console.log('Dados salvos:', this.perfil, this.redesSociais);
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
          }
        },
        {
          text: 'Ver chaves existentes',
          handler: () => {
            console.log('Ver chaves');
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
            // Redirecionar para tela de login
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
            // Implementar lógica de exclusão
          }
        }
      ]
    });
    await alert.present();
  }
 
  // ========== AUXILIARES ==========
  async mostrarToast(mensagem: string) {
    // Toast simplificado usando Alert
    const alert = await this.alertController.create({
      message: mensagem,
      buttons: ['OK'],
      cssClass: 'toast-alert'
    });
   
    await alert.present();
   
    // Auto-dismiss após 2 segundos
    setTimeout(() => {
      alert.dismiss();
    }, 2000);
  }
}