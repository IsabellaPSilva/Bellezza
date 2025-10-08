import { Component } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendarioP',
  templateUrl: './calendarioP.page.html',
  styleUrls: ['./calendarioP.page.scss'],
  standalone: true, // 🔑 agora é standalone
  imports: [IonicModule, CommonModule, FormsModule] // 🔑 importa aqui
})
export class CalendarioPPage {
  selectedDate: string | null = null;

  constructor(private alertCtrl: AlertController) {}

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
