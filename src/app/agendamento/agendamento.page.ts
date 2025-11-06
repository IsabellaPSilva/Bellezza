import { Component } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-agendamentos',
  templateUrl:'./agendamento.page.html',
  styleUrls: ['./agendamento.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class AgendamentosPage {

  constructor(
    private alertCtrl: AlertController,
    private router: Router // <-- Injetar Router
  ) {}

  async confirmarCancelamento() {
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
            console.log('Atendimento cancelado!');
            // Aqui você pode chamar seu serviço para cancelar no backend
          }
        }
      ]
    });

    await alert.present();
  }
  irParaHome() {
  this.router.navigate(['/home']);
}
}
