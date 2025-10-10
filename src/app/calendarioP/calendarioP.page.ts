import { Component } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // 👈 importe o Router

@Component({
  selector: 'app-calendarioP',
  templateUrl: './calendarioP.page.html',
  styleUrls: ['./calendarioP.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CalendarioPPage {
  selectedDate: string | null = null;

  // 👇 injete o Router aqui dentro
  constructor(
    private alertCtrl: AlertController,
    private router: Router // ✅ agora o this.router existe
  ) {}

  async confirmarAcao(acao: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmação',
      message: `Você tem certeza que deseja ${acao} este agendamento?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Sim', handler: () => console.log(`Agendamento ${acao} com sucesso!`) },
      ],
    });
    await alert.present();
  }

  // 👇 função de navegação para o perfil
  irParaPerfil() {
    this.router.navigate(['/perfil']); // ✅ funciona agora
  }

  async adicionarHorario() {
    const alert = await this.alertCtrl.create({
      header: 'Novo horário',
      message: 'Você deseja adicionar um novo horário de serviço?',
      buttons: [
        { text: 'Não', role: 'cancel' },
        { text: 'Sim', handler: () => console.log('Novo horário adicionado') },
      ],
    });
    await alert.present();
  }
}
