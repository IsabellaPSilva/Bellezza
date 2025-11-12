import { Component } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, RouterLink, CommonModule],
})
export class HomePage {
  constructor(private router: Router) {}

  IrParaDetalhes() {
    this.router.navigateByUrl('/details');
  }

  mostrarEscolha: boolean = false;
}

