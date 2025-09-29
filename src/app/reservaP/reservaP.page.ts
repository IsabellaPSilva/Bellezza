import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservaP',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './reservaP.page.html',
  styleUrls: ['./reservaP.page.scss'],
})
export class reservaPPage {
  servicos1 = [{ nome: '', preco: '' }, { nome: '', preco: '' }];
  servicos2 = [{ nome: '', preco: '' }, { nome: '', preco: '' }, { nome: '', preco: '' }, { nome: '', preco: '' }];

  reservar(servico: any) {
    console.log('Serviço reservado:', servico);
  }
}
