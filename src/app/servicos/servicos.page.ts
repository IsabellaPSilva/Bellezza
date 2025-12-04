import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
 
@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DecimalPipe,
    RouterLink
  ],
})
export class ServicosPage {
  query: string = '';
  services = [
    { name: 'Mão', price: 35.0, time: '1h30', selected: false },
    { name: 'Pé', price: 40.0, time: '1h30', selected: false },
    { name: 'Luzes', price: 50.0, time: '2h', selected: false },
    { name: 'Mão e Pé', price: 65.0, time: '2h30', selected: false },
    { name: 'Sobrancelha', price: 25.0, time: '30m', selected: false },
    { name: 'Cílios', price: 30.0, time: '1h', selected: false },
  ];
 
  filtered = [...this.services];
  servicosSelecionados: any[] = [];
  servicoPrincipal: any = {};
 
  constructor(private navCtrl: NavController, private router: Router) {
    this.carregarDadosIniciais();
  }
 
  carregarDadosIniciais() {
    const navigation = this.router.getCurrentNavigation();
   
    if (navigation?.extras?.state) {
      // Carrega serviços selecionados
      if (navigation.extras.state['servicosSelecionados']) {
        this.servicosSelecionados = navigation.extras.state['servicosSelecionados'];
      }
     
      // Carrega serviço principal
      if (navigation.extras.state['servicoPrincipal']) {
        this.servicoPrincipal = navigation.extras.state['servicoPrincipal'];
      }
    }
 
    // Marca os serviços selecionados na lista
    this.marcarServicosSelecionados();
  }
 
  calcularTotalAdicional(): number {
    return this.servicosSelecionados.reduce(
      (sum, servico) => sum + servico.price,
      0
    );
  }
 
  calcularTotalGeral(): number {
    const totalPrincipal = this.servicoPrincipal.preco || 0;
    return totalPrincipal + this.calcularTotalAdicional();
  }
 
  marcarServicosSelecionados() {
    this.services.forEach((service) => {
      service.selected = this.servicosSelecionados.some(
        (selected) => selected.name === service.name
      );
    });
    this.filtered = [...this.services];
  }
 
  applyFilter() {
    const filter = this.query.toLowerCase();
    this.filtered = this.services.filter((s) =>
      s.name.toLowerCase().includes(filter)
    );
  }
 
  toggleServico(service: any) {
    service.selected = !service.selected;
 
    if (service.selected) {
      // Verifica se já não está na lista
      if (!this.servicosSelecionados.some(s => s.name === service.name)) {
        this.servicosSelecionados.push({...service});
      }
    } else {
      this.servicosSelecionados = this.servicosSelecionados.filter(
        (s) => s.name !== service.name
      );
    }
 
    console.log('Serviços selecionados:', this.servicosSelecionados);
  }
 
  onCancelar() {
    this.navCtrl.back();
  }
 
  onConfirmar() {
    // Salva no localStorage para manter os dados
    localStorage.setItem('servicosAdicionais', JSON.stringify(this.servicosSelecionados));
   
    // Navega de volta para o calendário com os serviços selecionados
    this.router.navigate(['/calendario'], {
      state: {
        servicosSelecionados: this.servicosSelecionados,
        servicoPrincipal: this.servicoPrincipal
      }
    });
  }
 
  // Método para limpar todos os serviços selecionados
  limparSelecoes() {
    this.servicosSelecionados = [];
    this.services.forEach(service => service.selected = false);
    this.filtered = [...this.services];
    localStorage.removeItem('servicosAdicionais');
  }
}
 