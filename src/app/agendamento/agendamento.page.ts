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
          { text: 'Não', role: 'cancel', cssClass: 'secondary' },
          {
            text: 'Sim, cancelar',
            handler: () => {
              this.reservas.splice(index, 1);
              localStorage.setItem('reservas', JSON.stringify(this.reservas));
            }
          }
        ]
      });
 
      await alert.present();
    }
 
    formatarDataResumo(data: string): string {
      try {
        const date = new Date(data);
        if (isNaN(date.getTime())) {
          if (data.includes('/')) {
            const partes = data.split('/');
            if (partes.length === 3) {
              const dia = partes[0];
              const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
              const mes = meses[parseInt(partes[1]) - 1];
              return `${dia} ${mes}`;
            }
          }
          return 'Data inválida';
        }
        const dia = date.getDate();
        const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
        const mes = meses[date.getMonth()];
        return `${dia} ${mes}`;
      } catch (error) {
        return 'Data inválida';
      }
    }
  }