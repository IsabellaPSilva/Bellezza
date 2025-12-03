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
    nome: 'Selecione um serviço',
    preco: 0.00,
    tempo: '0h'
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
    this.carregarServicoSelecionado();
    this.carregarServicosAdicionais();
    if (this.selectedDate) {
      this.carregarHorariosDisponiveis();
    }
  }

  carregarServicoSelecionado() {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras?.state?.['servicoSelecionado']) {
      const servico = navigation.extras.state['servicoSelecionado'];
      this.servicoSelecionado = {
        nome: servico.nome,
        preco: servico.preco,
        tempo: servico.tempo
      };
    } else {
      const servicoSalvo = localStorage.getItem('servicoSelecionado');
      if (servicoSalvo) {
        try {
          this.servicoSelecionado = JSON.parse(servicoSalvo);
        } catch (error) {
          this.usarServicoPadrao();
        }
      } else {
        this.usarServicoPadrao();
      }
    }
  }

  private usarServicoPadrao() {
    this.servicoSelecionado = {
      nome: 'Selecione um serviço',
      preco: 0.00,
      tempo: '0h'
    };
  }

  carregarDadosIniciais() {
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
      } catch (error) { }
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

  async reservar() {
    if (!this.selectedDate || !this.selectedHorario) return;

    const dataFormatada = new Date(this.selectedDate).toLocaleDateString('pt-BR');

    // 🔥 PEGAR NOME DO PERFIL SALVO
    const perfil = JSON.parse(localStorage.getItem("perfil_usuario") || "{}");
    const nomeCliente = perfil.nomeUsuario || "Cliente";

    const novaReserva = {
      id: new Date().getTime(),
      servico: this.servicoSelecionado.nome,
      preco: this.getTotalGeralFormatado(),
      data: this.selectedDate,
      dataExibicao: dataFormatada,
      horario: this.selectedHorario,
      servicosAdicionais: this.servicosAdicionais,
      cliente: nomeCliente, // <<<<<<<<<< AQUI AGORA ESTÁ CORRETO
      status: 'pendente'
    };

    const reservas = JSON.parse(localStorage.getItem('reservasP') || '[]');
    reservas.push(novaReserva);
    localStorage.setItem('reservasP', JSON.stringify(reservas));

    localStorage.removeItem('servicoSelecionado');

    const alert = await this.alertCtrl.create({
      header: 'Reserva concluída',
      message: `
        Serviço: ${novaReserva.servico}<br>
        Data: ${novaReserva.dataExibicao}<br>
        Horário: ${novaReserva.horario}<br>
        Total: ${novaReserva.preco}
      `,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/agendamento']);
          }
        }
      ]
    });

    await alert.present();
  }
}
