import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-calendarioP',
  templateUrl: './calendarioP.page.html',
  styleUrls: ['./calendarioP.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CalendarioPPage implements OnInit {
  selectedDate: string | null = null;
  reservas: any[] = [];
 
  constructor(
    private alertCtrl: AlertController,
    private router: Router
  ) {}
 
  ngOnInit() {
    this.carregarReservas();
  }
 
  // Carrega as reservas do localStorage
  carregarReservas() {
    const reservasSalvas = localStorage.getItem('reservasP');
    console.log('Dados do localStorage:', reservasSalvas);
   
    if (reservasSalvas) {
      this.reservas = JSON.parse(reservasSalvas);
      console.log('Reservas carregadas:', this.reservas);
    } else {
      this.reservas = [];
      console.log('Nenhuma reserva encontrada no localStorage');
    }
  }
 
  ionViewWillEnter() {
    this.carregarReservas();
  }
 
  async confirmarAcao(acao: string, reserva: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmação',
      message: `Você tem certeza que deseja ${acao} este agendamento?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: () => {
            if (acao === 'aceitar') {
              this.aceitarReserva(reserva);
            } else if (acao === 'recusar') {
              this.recusarReserva(reserva);
            }
          }
        },
      ],
    });
    await alert.present();
  }
 
  // Aceitar reserva
  aceitarReserva(reserva: any) {
    reserva.status = 'aceito';
    this.atualizarLocalStorage();
    console.log('Agendamento aceito:', reserva);
   
    // Enviar reserva para a página de agendamentos
    this.enviarParaAgendamentos(reserva);
   
    this.mostrarAlertaSucesso('Agendamento aceito com sucesso!');
  }
 
  // Recusar reserva
  recusarReserva(reserva: any) {
    // Encontra o índice da reserva pelo ID
    const index = this.reservas.findIndex(r => r.id === reserva.id);
    if (index > -1) {
      this.reservas.splice(index, 1);
      this.atualizarLocalStorage();
      console.log('Agendamento recusado e removido');
      this.mostrarAlertaSucesso('Agendamento recusado com sucesso!');
    }
  }
 
  // Enviar reserva para a página de agendamentos
  enviarParaAgendamentos(reserva: any) {
    // Carrega as reservas existentes na página de agendamentos
    const reservasAgendamento = JSON.parse(localStorage.getItem('reservas') || '[]');
   
    // Cria um objeto compatível com a página de agendamentos
    const reservaAgendamento = {
      id: reserva.id,
      servico: reserva.servico,
      preco: reserva.preco,
      data: reserva.dataExibicao || reserva.data,
      horario: reserva.horario,
      cliente: reserva.cliente,
      status: 'confirmado'
    };
   
    // Adiciona à lista de agendamentos
    reservasAgendamento.push(reservaAgendamento);
   
    // Salva no localStorage da página de agendamentos
    localStorage.setItem('reservas', JSON.stringify(reservasAgendamento));
   
    console.log('Reserva enviada para agendamentos:', reservaAgendamento);
  }
 
  // Atualiza o localStorage com as reservas modificadas
  atualizarLocalStorage() {
    localStorage.setItem('reservasP', JSON.stringify(this.reservas));
    console.log('LocalStorage atualizado:', this.reservas);
  }
 
  async mostrarAlertaSucesso(mensagem: string) {
    const alert = await this.alertCtrl.create({
      header: 'Sucesso',
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }
 
  irParaPerfil() {
    this.router.navigate(['/perfil']);
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
 
  // Formata a data para exibição (ex: "30 ABR")
  formatarData(data: string): string {
    try {
      const date = new Date(data);
      if (isNaN(date.getTime())) {
        return 'Data inválida';
      }
      const dia = date.getDate();
      const meses = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
      const mes = meses[date.getMonth()];
      return `${dia} ${mes}`;
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Data inválida';
    }
  }
 
  // Função trackBy para melhor performance
  trackByReservaId(index: number, reserva: any): number {
    return reserva.id;
  }
}