import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {
  // ===== Variáveis do Login =====
  email: string = '';
  senha: string = '';

  // ===== Variáveis do Modal Recuperar Senha =====
  mostrarRecuperarSenha: boolean = false;
  emailRecuperar: string = '';

  // ===== Variáveis do Modal Alterar Senha =====
  mostrarAlterarSenha: boolean = false;
  codigo: string = '';
  novaSenha: string = '';
  confirmarSenha: string = '';

  constructor(private toastCtrl: ToastController, private router: Router) {}

  // Limitar tamanho dos campos
  limitLength(event: any, field: string, max = 55) {
    const input = event.target as HTMLInputElement;
    let val = input.value || '';
    if (val.length > max) {
      val = val.substring(0, max);
      input.value = val;
      (this as any)[field] = val;
    }
  }

  // ===== FUNÇÕES DO LOGIN =====
  async entrar() {
    if (!this.isFormValid()) {
      const toast = await this.toastCtrl.create({
        message: 'Preencha corretamente o email e a senha.',
        duration: 2000,
        position: 'bottom',
        cssClass: 'toast-erro-customizado'
      });
      await toast.present();
      return;
    }

    const clientesSalvos = JSON.parse(localStorage.getItem('clientes') || '[]');
    const cliente = clientesSalvos.find((c: any) => c.email === this.email);

    if (!cliente) {
      const toast = await this.toastCtrl.create({
        message: 'E-mail não encontrado. Verifique ou cadastre-se primeiro.',
        duration: 2000,
        position: 'bottom',
        cssClass: 'toast-erro-customizado'
      });
      await toast.present();
      return;
    }

    if (cliente.senha !== this.senha) {
      const toast = await this.toastCtrl.create({
        message: 'Senha incorreta. Tente novamente.',
        duration: 2000,
        position: 'bottom',
        cssClass: 'toast-erro-customizado'
      });
      await toast.present();
      return;
    }

    const toast = await this.toastCtrl.create({
      message: 'Login realizado com sucesso!',
      duration: 1500,
      position: 'bottom',
      cssClass: 'toast-sucesso-customizado'
    });
    await toast.present();

    setTimeout(() => {
      this.router.navigate(['/agendamento-home']);
    }, 1000);

    this.email = '';
    this.senha = '';
  }

  // ===== MÉTODOS DE MODAIS =====
  abrirRecuperarSenha() {
    this.mostrarRecuperarSenha = true;
  }

  fecharRecuperarSenha() {
    this.mostrarRecuperarSenha = false;
    this.emailRecuperar = '';
  }

  enviarCodigo() {
    if (!this.emailRecuperar) {
      this.toastCtrl.create({
        message: 'Digite um email para receber o código.',
        duration: 2000,
        position: 'bottom',
        cssClass: 'toast-erro-customizado'
      }).then(toast => toast.present());
      return;
    }
    console.log('Código enviado para:', this.emailRecuperar);
    this.irParaAlterarSenha();
  }

  irParaAlterarSenha() {
    this.mostrarRecuperarSenha = false;
    this.mostrarAlterarSenha = true;
  }

  fecharAlterarSenha() {
    this.mostrarAlterarSenha = false;
    this.codigo = '';
    this.novaSenha = '';
    this.confirmarSenha = '';
  }

  alterarSenha() {
    if (!this.codigo || !this.novaSenha || !this.confirmarSenha) {
      this.toastCtrl.create({
        message: 'Preencha todos os campos para alterar a senha.',
        duration: 2000,
        position: 'bottom',
        cssClass: 'toast-erro-customizado'
      }).then(toast => toast.present());
      return;
    }
    if (this.novaSenha !== this.confirmarSenha) {
      this.toastCtrl.create({
        message: 'As senhas não conferem.',
        duration: 2000,
        position: 'bottom',
        cssClass: 'toast-erro-customizado'
      }).then(toast => toast.present());
      return;
    }
    console.log('Senha alterada para:', this.novaSenha);
    this.fecharAlterarSenha();
  }

  cadastrar() {
    this.router.navigate(['/cadastro']);
  }

  // ===== VALIDAÇÃO DO FORMULÁRIO =====
  isFormValid(): boolean {
    if (!this.email || this.email.trim().length === 0) return false;
    if (!this.senha || this.senha.trim().length === 0) return false;

    const basicEmail = /\S+@\S+\.\S+/;
    if (!basicEmail.test(this.email)) return false;

    if (this.email.length > 55 || this.senha.length > 55) return false;

    return true;
  }
}
