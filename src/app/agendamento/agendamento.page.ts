import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
 
@Component({
  selector: 'app-agendamentos',
  templateUrl: './agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class AgendamentosPage implements OnInit {
  reservas: any[] = [];
 
  constructor(
    private alertCtrl: AlertController,
    private router: Router
  ) {}
 
  ngOnInit() {
    this.carregarReservas();
  }
 
  ionViewWillEnter() {
    this.carregarReservas();
  }
 
  carregarReservas() {
    const reservasSalvas = JSON.parse(localStorage.getItem('reservas') || '[]');
    this.reservas = reservasSalvas;
  }
 
  async confirmarCancelamento(index: number) {
    const alert = await this.alertCtrl.create({
      header: 'Cancelar Atendimento',
      message: 'Você tem certeza que deseja cancelar este atendimento?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Sim, cancelar',
          handler: () => {
            // Remove a reserva da lista
            this.reservas.splice(index, 1);
            // Atualiza o localStorage
            localStorage.setItem('reservas', JSON.stringify(this.reservas));
          }
        }
      ]
    });
 
    await alert.present();
  }
 
  irParaReserva() {
    this.router.navigate(['/reserva']);
  }
 
  irParaHome() {
    this.router.navigate(['/home']);
  }
}