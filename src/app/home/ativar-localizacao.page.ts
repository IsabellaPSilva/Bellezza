// src/app/home/ativar-localizacao.page.ts
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ativar-localizacao',
  templateUrl: './ativar-localizacao.page.html',
  styleUrls: ['./ativar-localizacao.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,  // <- IMPORTANTE
    RouterModule  // <- se estiver usando routerLink
  ]
})
export class AtivarLocalizacaoPage {}
