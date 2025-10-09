import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CalendarioPage {
  selectedDate: string | null = null;
  horarios: string[] = ['14:30', '16:00', '19:10'];
  selectedHorario: string | null = null;

  constructor(private alertCtrl: AlertController) {}

  selecionarHorario(horario: string) {
    this.selectedHorario = horario;
  }

  async adicionarHorario() {
    const alert = await this.alertCtrl.create({
      header: 'Novo serviço',
      message: 'Deseja adicionar mais serviços?',
      buttons: ['Cancelar', 'Sim']
    });
    await alert.present();
  }

  async reservar() {
    if (!this.selectedDate || !this.selectedHorario) {
      const alert = await this.alertCtrl.create({
        header: 'Atenção',
        message: 'Selecione uma data e horário antes de reservar!',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Reserva concluída',
      message: `Você reservou para ${this.selectedDate} às ${this.selectedHorario}.`,
      buttons: ['OK']
    });
    await alert.present();
  }
}
