import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,  // <- ESSENCIAL para ion-router-outlet e ion-button
    RouterModule  // <- ESSENCIAL para o roteamento
  ]
})
export class AppComponent {}
