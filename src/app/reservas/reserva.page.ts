import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ReservaPage {

  combos = [
    { name: 'Aplique + unha', price: 'R$ 830,00', duration: '3hr' },
    { name: 'Unha em gel + trança', price: 'R$ 830,00', duration: '3hr' },
  ];

  cabelo = [
    { name: 'Finalização', price: 'R$ 150,00', duration: '45m' },
    { name: 'Alisamento', price: 'R$ 150,00', duration: '1hr' },
    { name: 'Tranças', price: 'R$ 280,00', duration: '2/3hr' },
    { name: 'Aplique', price: 'R$ 800,00', duration: '2hr' },
    { name: 'Cabelo', price: 'R$ 350,00', duration: '2hr' },
  ];

  reservar(item: any) {
    console.log('Reservando:', item.name);
    alert(`Você reservou: ${item.name}`);
  }
}
