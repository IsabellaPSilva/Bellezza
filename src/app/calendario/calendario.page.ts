import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class CalendarioPage {
  selectedDate: string | null = null;
  horarios: string[] = ['14:30', '16:00', '19:10'];
  selectedHorario: string | null = null;
 
  constructor(private alertCtrl: AlertController, private router: Router) {}
 
  selecionarHorario(horario: string) {
    this.selectedHorario = horario;
  }
 
  async adicionarHorario() {
    const alert = await this.alertCtrl.create({
      header: 'Novo serviço',
      message: 'Deseja adicionar mais serviços?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Sim',
          handler: () => {
            this.router.navigate(['/servicos']);
          }
        }
      ]
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
 
    // Cria o objeto da reserva
    const novaReserva = {
      servico: 'Combo: Aplique + Unha',
      preco: 'R$ 830,00',
      data: this.selectedDate,
      horario: this.selectedHorario
    };
 
    // Salva no localStorage
    const reservas = JSON.parse(localStorage.getItem('reservas') || '[]');
    reservas.push(novaReserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));
 
    // Mostra alerta de sucesso
    const alert = await this.alertCtrl.create({
      header: 'Reserva concluída',
      message: `Você reservou para ${this.selectedDate} às ${this.selectedHorario}.`,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/agendamento']); // Redireciona para agendamento
          }
        }
      ]
    });
 
    await alert.present();
  }
}