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
  // Variáveis do Login
  email: string = '';
  senha: string = '';
 
  // Variáveis do Modal Recuperar Senha
  mostrarRecuperarSenha: boolean = false;
  emailRecuperar: string = '';
 
  // Variáveis do Modal Alterar Senha
  mostrarAlterarSenha: boolean = false;
  codigo: string = '';
  novaSenha: string = '';
  confirmarSenha: string = '';
 
  constructor(private toastCtrl: ToastController, private router: Router) {}
 
  limitLength(event: any, field: string, max = 55) {
    const input = event.target as HTMLInputElement;
    let val = input.value || '';
    if (val.length > max) {
      val = val.substring(0, max);
      input.value = val;
      (this as any)[field] = val;
    }
  }
 
  // ====== FUNÇÕES DO LOGIN ======
 
  isFormValid(): boolean {
    if (!this.email || this.email.trim().length === 0) return false;
    if (!this.senha || this.senha.trim().length === 0) return false;
 
    const basicEmail = /\S+@\S+\.\S+/;
    if (!basicEmail.test(this.email)) return false;
 
    if (this.email.length > 55 || this.senha.length > 55) return false;
 
    return true;
  }
 
  async cadastrar() {
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
 
  // ====== FUNÇÕES DO MODAL RECUPERAR SENHA ======
 
  abrirRecuperarSenha() {
    this.mostrarRecuperarSenha = true;
    this.emailRecuperar = '';
  }
 
  fecharRecuperarSenha() {
    this.mostrarRecuperarSenha = false;
    this.emailRecuperar = '';
  }
 
  isEmailValid(email: string): boolean {
    if (!email || email.trim().length === 0) return false;
    const basicEmail = /\S+@\S+\.\S+/;
    return basicEmail.test(email);
  }
 
  async enviarCodigo() {
    if (!this.isEmailValid(this.emailRecuperar)) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, digite um email válido.',
        duration: 2000,
        position: 'bottom',
        cssClass: 'toast-erro-customizado'
      });
      await toast.present();
      return;
    }
 
    // Simulação de envio de código
    const toast = await this.toastCtrl.create({
      message: 'Código enviado para seu email!',
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast-sucesso-customizado'
    });
    await toast.present();
 
    setTimeout(() => {
      this.fecharRecuperarSenha();
      this.abrirAlterarSenha();
    }, 1500);
  }
 
  irParaAlterarSenha() {
    this.fecharRecuperarSenha();
    this.abrirAlterarSenha();
  }
 
  // ====== FUNÇÕES DO MODAL ALTERAR SENHA ======
 
  abrirAlterarSenha() {
    this.mostrarAlterarSenha = true;
    this.codigo = '';
    this.novaSenha = '';
    this.confirmarSenha = '';
  }
 
  fecharAlterarSenha() {
    this.mostrarAlterarSenha = false;
    this.codigo = '';
    this.novaSenha = '';
    this.confirmarSenha = '';
  }
 
  async alterarSenha() {
    if (!this.codigo || this.codigo.trim().length === 0) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, digite o código de verificação.',
        duration: 2000,
        position: 'bottom',
        cssClass: 'toast-erro-customizado'
      });
      await toast.present();
      return;
    }
 
    if (!this.novaSenha || this.novaSenha.trim().length === 0) {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, digite sua nova senha.',
        duration: 2000,
        position: 'bottom',
        cssClass: 'toast-erro-customizado'
      });
      await toast.present();
      return;
    }
 
    if (this.novaSenha.length < 6) {
      const toast = await this.toastCtrl.create({
        message: 'A senha deve ter no mínimo 6 caracteres.',
        duration: 2000,
        position: 'bottom',
        cssClass: 'toast-erro-customizado'
      });
      await toast.present();
      return;
    }
 
    if (this.novaSenha !== this.confirmarSenha) {
      const toast = await this.toastCtrl.create({
        message: 'As senhas não coincidem.',
        duration: 2000,
        position: 'bottom',
        cssClass: 'toast-erro-customizado'
      });
      await toast.present();
      return;
    }
 
    // Simulação de alteração de senha bem-sucedida
    const toast = await this.toastCtrl.create({
      message: 'Senha alterada com sucesso!',
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast-sucesso-customizado'
    });
    await toast.present();
 
    setTimeout(() => {
      this.fecharAlterarSenha();
    }, 1500);
 
    this.codigo = '';
    this.novaSenha = '';
    this.confirmarSenha = '';
  }
}
 