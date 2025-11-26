import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-profissional',
  templateUrl: './cadastro-profissional.page.html',
  styleUrls: ['./cadastro-profissional.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CadastroProfissionalPage {

  nome: string = '';
  empresa: string = '';
  email: string = '';     
  senha: string = '';
  telefone: string = '';
  cep: string = '';

  constructor(private toastCtrl: ToastController, private router: Router) {}

  // Impede números nos campos nome/empresa
  onNoNumbers(event: any, field: string) {
    const input = event.target as HTMLInputElement;
    const clean = input.value.replace(/\d/g, '');
    if (input.value !== clean) {
      input.value = clean;
      (this as any)[field] = clean;
    }
    if (clean.length > 45) {
      const truncated = clean.substring(0, 45);
      input.value = truncated;
      (this as any)[field] = truncated;
    }
  }

  // Limita o tamanho do campo
  limitLength(event: any, field: string, max = 45) {
    const input = event.target as HTMLInputElement;
    let val = input.value || '';
    if (val.length > max) {
      val = val.substring(0, max);
      input.value = val;
      (this as any)[field] = val;
    }
  }

  // Permite apenas números (telefone e CEP)
  numericOnly(event: any, field: string, max = 14) {
    const input = event.target as HTMLInputElement;
    let val = input.value || '';
    const clean = val.replace(/\D/g, '');
    let result = clean;
    if (clean.length > max) result = clean.substring(0, max);
    if (val !== result) {
      input.value = result;
      (this as any)[field] = result;
    }
  }

  // ✅ VALIDAÇÃO DE EMAIL
  validarEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  // Validação do formulário
  isFormValid(): boolean {

    if (!this.nome || !this.empresa || !this.email || !this.senha || !this.telefone || !this.cep) {
      return false;
    }

    if (!this.validarEmail(this.email)) {
      return false;
    }

    if (this.nome.length > 45 || this.empresa.length > 45 || this.senha.length > 15) return false;
    if (this.email.length > 60) return false;
    if (this.telefone.length > 14 || this.cep.length > 8) return false;

    return true;
  }

  // Cadastro e sincronização com o perfil
  async cadastrar() {

    if (!this.isFormValid()) {
      const toast = await this.toastCtrl.create({
        message: 'Preencha corretamente todos os campos.',
        duration: 2000,
        position: 'bottom',
        cssClass: 'toast-erro-customizado'
      });
      await toast.present();
      return;
    }

    // 🚨 VERIFICAR SE JÁ EXISTE PROFISSIONAL COM MESMO EMAIL OU MESMO CEP
    const profissionaisSalvos = JSON.parse(localStorage.getItem('profissionais') || '[]');
    
    // Verificar duplicidade - CORRIGIDO: verificar email OU CEP
    const profissionalExistente = profissionaisSalvos.find((prof: any) => 
      prof.email === this.email || prof.cep === this.cep
    );

    if (profissionalExistente) {
      // Mensagem mais específica
      let mensagem = 'Já existe um cadastro com ';
      if (profissionalExistente.email === this.email && profissionalExistente.cep === this.cep) {
        mensagem += 'este e-mail e CEP.';
      } else if (profissionalExistente.email === this.email) {
        mensagem += 'este e-mail.';
      } else {
        mensagem += 'este CEP.';
      }

      const toast = await this.toastCtrl.create({
        message: mensagem,
        duration: 3000,
        position: 'bottom',
        cssClass: 'toast-erro-customizado'
      });
      await toast.present();
      return;
    }

    // ✅ Se não existe, prosseguir com o cadastro
    const novoProfissional = {
      nome: this.nome,
      empresa: this.empresa,
      email: this.email,
      senha: this.senha,
      telefone: this.telefone,
      cep: this.cep
    };

    // 🧩 Salvar na lista geral
    profissionaisSalvos.push(novoProfissional);
    localStorage.setItem('profissionais', JSON.stringify(profissionaisSalvos));

    // 🧠 Salvar também no perfil ativo (perfil_profissional)
    const perfilAtivo = {
      nomeUsuario: novoProfissional.nome,
      nomeEmpresa: novoProfissional.empresa,
      profissao: '', // pode ser editado depois
      endereco: novoProfissional.cep,
      telefone: novoProfissional.telefone,
      email: novoProfissional.email,
      descricao: '',
      senha: novoProfissional.senha,
      genero: 'feminino',
      fotoUrl: ''
    };
    localStorage.setItem('perfil_profissional', JSON.stringify(perfilAtivo));

    // ✅ Mostrar confirmação ANTES de navegar
    const toast = await this.toastCtrl.create({
      message: 'Cadastro realizado com sucesso!',
      duration: 1500,
      position: 'bottom',
      cssClass: 'toast-sucesso-customizado'
    });
    await toast.present();

    // ✅ Aguardar um pouco antes de navegar
    await new Promise(resolve => setTimeout(resolve, 1600));

    // ✅ Navegar para a tela de perfil do profissional
    await this.router.navigate(['/localizacaoP']);

    // ✅ Limpar campos
    this.nome = '';
    this.empresa = '';
    this.email = '';
    this.senha = '';
    this.telefone = '';
    this.cep = '';
  }
}