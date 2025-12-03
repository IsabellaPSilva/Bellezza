import { Component, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
 
@Component({
  selector: 'app-calendarioP',
  templateUrl: './calendarioP.page.html',
  styleUrls: ['./calendarioP.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
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
 
  // Confirmar limpeza do histórico
  async confirmarLimparHistorico() {
    if (this.reservas.length === 0) {
      this.mostrarAlertaSucesso('Não há histórico para limpar.');
      return;
    }
 
    const alert = await this.alertCtrl.create({
      header: 'Limpar Histórico',
      message: 'Tem certeza que deseja apagar todo o histórico de agendamentos? Esta ação não pode ser desfeita.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Limpar Tudo',
          role: 'destructive',
          handler: () => {
            this.limparHistorico();
          }
        },
      ],
    });
    await alert.present();
  }
 
  // Limpar todo o histórico
  limparHistorico() {
    this.reservas = [];
    this.atualizarLocalStorage();
    console.log('Histórico de agendamentos limpo');
    this.mostrarAlertaSucesso('Histórico de agendamentos limpo com sucesso!');
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
      header: 'Adicionar Horário Disponível',
      inputs: [
        {
          name: 'horario',
          type: 'text',
          placeholder: 'Ex: 14:30, 16:00, 19:10',
          attributes: {
            maxlength: 5
          }
        },
        {
          name: 'data',
          type: 'date',
          placeholder: 'Selecione a data'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Adicionar',
          handler: (data) => {
            if (data.horario && data.data) {
              this.salvarHorarioDisponivel(data.horario, data.data);
            } else {
              this.mostrarAlertaErro('Preencha todos os campos!');
            }
          }
        },
      ],
    });
    await alert.present();
  }
 
  // Salvar horário disponível no localStorage do calendário
  async salvarHorarioDisponivel(horario: string, data: string) {
    try {
      // Valida o formato do horário
      if (!this.validarFormatoHorario(horario)) {
        this.mostrarAlertaErro('Formato de horário inválido! Use HH:MM (ex: 14:30)');
        return;
      }
 
      // Carrega horários existentes do calendário
      const horariosExistentes = JSON.parse(localStorage.getItem('horariosDisponiveis') || '[]');
     
      // Garante que a data está no formato YYYY-MM-DD
      const dataObj = new Date(data);
      if (isNaN(dataObj.getTime())) {
        this.mostrarAlertaErro('Data inválida!');
        return;
      }
     
      const dataFormatada = dataObj.toISOString().split('T')[0];
     
      // Verifica se o horário já existe para esta data
      const horarioExistente = horariosExistentes.find((h: any) =>
        h.data === dataFormatada && h.horario === horario
      );
 
      if (horarioExistente) {
        this.mostrarAlertaErro('Este horário já existe para esta data!');
        return;
      }
 
      // Cria o novo horário
      const novoHorario = {
        id: new Date().getTime(),
        horario: horario,
        data: dataFormatada,
        dataExibicao: this.formatarDataParaExibicao(dataFormatada),
        adicionadoPor: 'profissional',
        timestamp: new Date().toISOString()
      };
 
      // Adiciona à lista
      horariosExistentes.push(novoHorario);
 
      // Salva no localStorage
      localStorage.setItem('horariosDisponiveis', JSON.stringify(horariosExistentes));
 
      console.log('✅ Horário adicionado:', novoHorario);
      console.log('💾 Todos os horários salvos:', horariosExistentes);
     
      this.mostrarAlertaSucesso(`Horário ${horario} adicionado para ${novoHorario.dataExibicao}!`);
     
    } catch (error) {
      console.error('❌ Erro ao adicionar horário:', error);
      this.mostrarAlertaErro('Erro ao adicionar horário!');
    }
  }
 
  // Validar formato do horário (HH:MM)
  private validarFormatoHorario(horario: string): boolean {
    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(horario);
  }
 
  async mostrarAlertaErro(mensagem: string) {
    const alert = await this.alertCtrl.create({
      header: 'Erro',
      message: mensagem,
      buttons: ['OK']
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
 
  // Formata data para exibição brasileira
  private formatarDataParaExibicao(data: string): string {
    const date = new Date(data);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
 
  // Função trackBy para melhor performance
  trackByReservaId(index: number, reserva: any): number {
    return reserva.id;
  }
}