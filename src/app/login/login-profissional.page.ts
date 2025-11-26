import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-profissional',
  templateUrl: './login-profissional.page.html',
  styleUrls: ['./login-profissional.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginProfissionalPage {
  email: string = '';
  senha: string = '';
  cep: string = '';

  mostrarRecuperarSenha = false;
  emailRecuperar = '';

  mostrarAlterarSenha = false;
  codigo = '';
  novaSenha = '';
  confirmarSenha = '';

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

  formatarCEP(event: any) {
    let input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 8) value = value.substring(0, 8);
    if (value.length > 5) value = value.replace(/(\d{5})(\d)/, '$1-$2');

    input.value = value;
    this.cep = value;
  }

  isFormValid(): boolean {
    const basicEmail = /\S+@\S+\.\S+/;
    const cepValido = /^\d{5}-\d{3}$/;
    return (
      basicEmail.test(this.email) &&
      this.senha.trim().length >= 6 &&
      cepValido.test(this.cep)
    );
  }

  async login() {
    if (!this.isFormValid()) {
      await this.showToast('Preencha corretamente email, senha e CEP.', true);
      return;
    }

    // 🚨 VERIFICAR SE O PROFISSIONAL ESTÁ CADASTRADO
    const profissionaisSalvos = JSON.parse(localStorage.getItem('profissionais') || '[]');
    
    // Remover o hífen do CEP para comparação
    const cepNumerico = this.cep.replace('-', '');
    
    // Buscar profissional com email, senha e CEP correspondentes
    const profissionalEncontrado = profissionaisSalvos.find((prof: any) => 
      prof.email === this.email && 
      prof.senha === this.senha && 
      prof.cep === cepNumerico
    );

    if (!profissionalEncontrado) {
      await this.showToast('Email, senha ou CEP incorretos. Verifique seus dados.', true);
      return;
    }

    // ✅ Login bem-sucedido
    await this.showToast('Login realizado com sucesso!');
    
    // Salvar informações do profissional logado
    localStorage.setItem('profissionalLogado', JSON.stringify(profissionalEncontrado));
    
    // Navegar para a home
    setTimeout(() => this.router.navigate(['/localizacaoP']), 1000);
    
    // Limpar campos
    this.email = '';
    this.senha = '';
    this.cep = '';
  }

  abrirRecuperarSenha() {
    this.mostrarRecuperarSenha = true;
  }
  fecharRecuperarSenha() {
    this.mostrarRecuperarSenha = false;
  }

  async enviarCodigo() {
    const basicEmail = /\S+@\S+\.\S+/;
    if (!basicEmail.test(this.emailRecuperar)) {
      return this.showToast('Digite um email válido.', true);
    }

    // 🚨 VERIFICAR SE O EMAIL EXISTE NO CADASTRO
    const profissionaisSalvos = JSON.parse(localStorage.getItem('profissionais') || '[]');
    const emailExiste = profissionaisSalvos.some((prof: any) => prof.email === this.emailRecuperar);

    if (!emailExiste) {
      return this.showToast('Email não encontrado. Verifique se está cadastrado.', true);
    }

    await this.showToast('Código enviado para seu email!');
    setTimeout(() => {
      this.fecharRecuperarSenha();
      this.abrirAlterarSenha();
    }, 1500);
  }

  abrirAlterarSenha() {
    this.mostrarAlterarSenha = true;
  }
  fecharAlterarSenha() {
    this.mostrarAlterarSenha = false;
  }

  async alterarSenha() {
    if (!this.codigo.trim()) return this.showToast('Digite o código.', true);
    if (this.novaSenha.length < 6)
      return this.showToast('A senha deve ter no mínimo 6 caracteres.', true);
    if (this.novaSenha !== this.confirmarSenha)
      return this.showToast('As senhas não coincidem.', true);

    // 🚨 ATUALIZAR SENHA NO LOCALSTORAGE
    const profissionaisSalvos = JSON.parse(localStorage.getItem('profissionais') || '[]');
    const profissionalIndex = profissionaisSalvos.findIndex((prof: any) => prof.email === this.emailRecuperar);

    if (profissionalIndex !== -1) {
      // Atualizar a senha do profissional
      profissionaisSalvos[profissionalIndex].senha = this.novaSenha;
      localStorage.setItem('profissionais', JSON.stringify(profissionaisSalvos));
      
      await this.showToast('Senha alterada com sucesso!');
      setTimeout(() => this.fecharAlterarSenha(), 1500);
      
      // Limpar campos
      this.emailRecuperar = '';
      this.codigo = '';
      this.novaSenha = '';
      this.confirmarSenha = '';
    } else {
      await this.showToast('Erro ao alterar senha. Tente novamente.', true);
    }
  }

  private async showToast(message: string, erro = false) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom',
      cssClass: erro
        ? 'toast-erro-customizado'
        : 'toast-sucesso-customizado'
    });
    await toast.present();
  }
}