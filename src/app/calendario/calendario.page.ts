import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
export class CalendarioPage implements OnInit {
  selectedDate: string | null = null;
  horarios: any[] = [];
  selectedHorario: string | null = null;
  servicoSelecionado: any = {
    nome: 'Combo: Aplique + Unha',
    preco: 830.00,
    tempo: '1h 30min'
  };
  servicosAdicionais: any[] = [];

  constructor(
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.carregarDadosIniciais();
  }

  ionViewWillEnter() {
    this.carregarServicosAdicionais();
    if (this.selectedDate) {
      this.carregarHorariosDisponiveis();
    }
  }

  carregarDadosIniciais() {
    this.servicoSelecionado = {
      nome: 'Combo: Aplique + Unha',
      preco: 830.00,
      tempo: '1h 30min'
    };
    this.horarios = [
      { horario: '14:30', disponivel: true, mensagem: 'Disponível' },
      { horario: '16:00', disponivel: true, mensagem: 'Disponível' },
      { horario: '19:10', disponivel: true, mensagem: 'Disponível' }
    ];
  }

  carregarServicosAdicionais() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['servicosSelecionados']) {
      this.servicosAdicionais = navigation.extras.state['servicosSelecionados'];
      // Salva no localStorage
      localStorage.setItem('servicosAdicionais', JSON.stringify(this.servicosAdicionais));
    }

    if (this.servicosAdicionais.length === 0) {
      const servicosSalvos = localStorage.getItem('servicosAdicionais');
      if (servicosSalvos) {
        this.servicosAdicionais = JSON.parse(servicosSalvos);
      }
    }
  }

  private carregarHorariosDisponiveis() {
    if (!this.selectedDate) {
      this.horarios = [];
      return;
    }

    const dataSelecionadaFormatada = new Date(this.selectedDate).toISOString().split('T')[0];
    const reservasExistentes = JSON.parse(localStorage.getItem('reservasP') || '[]');
    const horariosSalvos = localStorage.getItem('horariosDisponiveis');

    if (horariosSalvos) {
      try {
        const horariosData = JSON.parse(horariosSalvos);
        this.horarios = horariosData
          .filter((h: any) => {
            const dataHorario = new Date(h.data).toISOString().split('T')[0];
            return dataHorario === dataSelecionadaFormatada;
          })
          .map((h: any) => {
            const ocupado = reservasExistentes.some((r: any) => {
              const dataReserva = new Date(r.data).toISOString().split('T')[0];
              return dataReserva === dataSelecionadaFormatada &&
                r.horario === h.horario &&
                r.status !== 'recusado';
            });
            return {
              horario: h.horario,
              disponivel: !ocupado,
              mensagem: ocupado ? 'Horário já agendado' : 'Disponível'
            };
          })
          .sort((a: any, b: any) => a.horario.localeCompare(b.horario));
        return;
      } catch (error) {
        console.error('Erro ao carregar horários:', error);
      }
    }

    this.horarios = [
      { horario: '14:30', disponivel: true, mensagem: 'Disponível' },
      { horario: '16:00', disponivel: true, mensagem: 'Disponível' },
      { horario: '19:10', disponivel: true, mensagem: 'Disponível' }
    ].map(h => {
      const ocupado = reservasExistentes.some((r: any) => {
        const dataReserva = new Date(r.data).toISOString().split('T')[0];
        return dataReserva === dataSelecionadaFormatada &&
          r.horario === h.horario &&
          r.status !== 'recusado';
      });
      return {
        ...h,
        disponivel: !ocupado,
        mensagem: ocupado ? 'Horário já agendado' : 'Disponível'
      };
    });
  }

  onDateChange() {
    this.carregarHorariosDisponiveis();
  }

  selecionarHorario(h: any) {
    if (h.disponivel) {
      this.selectedHorario = h.horario;
    }
  }

  adicionarServicos() {
    this.router.navigate(['/servicos'], {
      state: {
        servicosSelecionados: this.servicosAdicionais,
        servicoPrincipal: this.servicoSelecionado
      }
    });
  }

  calcularTotalServicos(): number {
    return this.servicosAdicionais.reduce((total, s) => total + s.price, 0);
  }

  getServicoNome() {
    return this.servicoSelecionado.nome;
  }

  getServicoPreco() {
    return `R$ ${this.servicoSelecionado.preco.toFixed(2).replace('.', ',')}`;
  }

  getTempoServico() {
    return this.servicoSelecionado.tempo;
  }

  getTotalGeral() {
    let total = this.servicoSelecionado.preco;
    total += this.calcularTotalServicos();
    return total;
  }

  getTotalGeralFormatado() {
    return `R$ ${this.getTotalGeral().toFixed(2).replace('.', ',')}`;
  }

  // Função para formatar lista de serviços adicionais
  getListaServicosAdicionais(): string {
    if (this.servicosAdicionais.length === 0) {
      return 'Nenhum serviço adicional';
    }
    return this.servicosAdicionais.map(s => s.name).join(', ');
  }

  async reservar() {
    if (!this.selectedDate || !this.selectedHorario) return;

    const dataFormatada = new Date(this.selectedDate).toLocaleDateString('pt-BR');

    // Formata a lista de serviços adicionais
    const servicosFormatados = this.servicosAdicionais.map(s =>
      `${s.name} - R$ ${s.price.toFixed(2).replace('.', ',')}`
    ).join('; ');

    const novaReserva = {
      id: new Date().getTime(),
      servico: this.servicoSelecionado.nome,
      preco: this.getTotalGeralFormatado(),
      data: this.selectedDate,
      dataExibicao: dataFormatada,
      horario: this.selectedHorario,
      servicosAdicionais: this.servicosAdicionais,
      listaServicosAdicionais: servicosFormatados, // String formatada
      cliente: 'Maria Silva',
      status: 'pendente'
    };

    const reservas = JSON.parse(localStorage.getItem('reservasP') || '[]');
    reservas.push(novaReserva);
    localStorage.setItem('reservasP', JSON.stringify(reservas));

    const alert = await this.alertCtrl.create({
      header: 'Reserva concluída',
      message: `
        Serviço: ${novaReserva.servico}<br>
        ${servicosFormatados ? 'Serviços adicionais: ' + servicosFormatados + '<br>' : ''}
        Data: ${novaReserva.dataExibicao}<br>
        Horário: ${novaReserva.horario}<br>
        Total: ${novaReserva.preco}
      `,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            // Limpa os serviços adicionais após reserva
            this.servicosAdicionais = [];
            localStorage.removeItem('servicosAdicionais');
            this.router.navigate(['/agendamento']);
          }
        }
      ]
    });

    await alert.present();
  }
}