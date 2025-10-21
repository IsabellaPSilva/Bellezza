import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
 
@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, DecimalPipe],
})
export class ServicosPage {
  query: string = '';
  services = [
    { name: 'Mão', price: 35.0, time: '1h30' },
    { name: 'Pé', price: 40.0, time: '1h30' },
    { name: 'Luzes', price: 50.0, time: '2h' },
    { name: 'Mão e Pé', price: 65.0, time: '2h30' },
    { name: 'Sobrancelha', price: 25.0, time: '30m' },
    { name: 'Cílios', price: 30.0, time: '1h' },
  ];
 
  filtered = [...this.services];
 
  applyFilter() {
    const filter = this.query.toLowerCase();
    this.filtered = this.services.filter((s) =>
      s.name.toLowerCase().includes(filter)
    );
  }
 
  onCancelar() {
    console.log('Cancelado');
  }
 
  onConfirmar() {
    console.log('Confirmado');
  }
}