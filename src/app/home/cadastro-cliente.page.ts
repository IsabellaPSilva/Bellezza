import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.page.html',
  styleUrls: ['./cadastro-cliente.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CadastroClientePage {
  nome: string = '';
  email: string = '';
  senha: string = '';
  telefone: string = '';

  constructor(private toastCtrl: ToastController, private router: Router) {}

  onNoNumbers(event: any, field: 'nome' | string) {
    const input = event.target as HTMLInputElement;
    const clean = input.value.replace(/\d/g, '');
    if (input.value !== clean) {
      input.value = clean;
      (this as any)[field] = clean;
    }
    if (clean.length > 55) {
      const truncated = clean.substring(0, 55);
      input.value = truncated;
      (this as any)[field] = truncated;
    }
  }

  limitLength(event: any, field: string, max = 55) {
    const input = event.target as HTMLInputElement;
    let val = input.value || '';
    if (val.length > max) {
      val = val.substring(0, max);
      input.value = val;
      (this as any)[field] = val;
    }
  }

  numericOnly(event: any, field: string, max = 15) {
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

  isFormValid(): boolean {
    if (!this.nome || this.nome.trim().length === 0) return false;
    if (!this.email || this.email.trim().length === 0) return false;
    if (!this.senha || this.senha.trim().length === 0) return false;
    if (!this.telefone || this.telefone.trim().length === 0) return false;

    if (this.nome.length > 55 || this.email.length > 55 || this.senha.length > 55) return false;
    if (this.telefone.length > 15) return false;

    const basicEmail = /\S+@\S+\.\S+/;
    if (!basicEmail.test(this.email)) return false;

    return true;
  }

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

    // Navega para a página de localização
    await this.router.navigate(['/localizacao']);

    const toast = await this.toastCtrl.create({
      message: 'Cadastro realizado com sucesso!',
      duration: 2000,
      position: 'bottom',
      cssClass: 'toast-sucesso-customizado'
    });
    await toast.present();

    // Limpa os campos
    this.nome = '';
    this.email = '';
    this.senha = '';
    this.telefone = '';
  }
}
