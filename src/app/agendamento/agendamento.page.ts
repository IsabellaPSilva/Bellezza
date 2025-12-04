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
    // Filtra apenas agendamentos com status "confirmado"
    this.reservas = reservasSalvas.filter((r: any) => r.status === 'confirmado');
  }
 
  async confirmarCancelamento(index: number) {
    const reserva = this.reservas[index];
   
    const alert = await this.alertCtrl.create({
      header: 'Cancelar Atendimento',
      message: `Tem certeza que deseja cancelar o agendamento de ${reserva.servico}?`,
      buttons: [
        { text: 'Não', role: 'cancel', cssClass: 'secondary' },
        {
          text: 'Sim, cancelar',
          handler: () => {
            // 1. Atualiza o status na página do profissional
            this.atualizarStatusNoProfissional(reserva);
           
            // 2. Remove da lista do cliente
            this.reservas.splice(index, 1);
           
            // 3. Atualiza localStorage do cliente (remove ou atualiza status)
            this.atualizarLocalStorageCliente(reserva);
           
            this.mostrarAlertaSucesso('Agendamento cancelado com sucesso!');
          }
        }
      ]
    });
 
    await alert.present();
  }
 
  // Atualiza o status do agendamento na página do profissional
  atualizarStatusNoProfissional(reserva: any) {
    // Carrega as reservas do profissional
    const reservasProfissional = JSON.parse(localStorage.getItem('reservasP') || '[]');
   
    // Encontra o agendamento correspondente
    const indexProfissional = reservasProfissional.findIndex((r: any) =>
      r.cliente === reserva.cliente &&
      r.servico === reserva.servico &&
      (r.data === reserva.data || r.dataExibicao === reserva.data) &&
      r.horario === reserva.horario
    );
   
    if (indexProfissional > -1) {
      // Atualiza o status do agendamento existente
      reservasProfissional[indexProfissional].status = 'cancelado';
      reservasProfissional[indexProfissional].motivo = 'Cancelado pelo cliente';
      reservasProfissional[indexProfissional].dataCancelamento = new Date().toISOString();
     
      // Salva no localStorage do profissional
      localStorage.setItem('reservasP', JSON.stringify(reservasProfissional));
     
      console.log('✅ Status atualizado para cancelado:', reservasProfissional[indexProfissional]);
    } else {
      console.log('❌ Agendamento não encontrado na lista do profissional');
    }
  }
 
  // Atualiza localStorage do cliente
  atualizarLocalStorageCliente(reservaCancelada: any) {
    const todasReservas = JSON.parse(localStorage.getItem('reservas') || '[]');
   
    // Encontra e remove a reserva cancelada
    const reservasAtualizadas = todasReservas.filter((r: any) =>
      !(r.cliente === reservaCancelada.cliente &&
        r.servico === reservaCancelada.servico &&
        r.data === reservaCancelada.data &&
        r.horario === reservaCancelada.horario)
    );
   
    localStorage.setItem('reservas', JSON.stringify(reservasAtualizadas));
  }
 
  async mostrarAlertaSucesso(mensagem: string) {
    const alert = await this.alertCtrl.create({
      header: 'Sucesso',
      message: mensagem,
      buttons: ['OK']
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