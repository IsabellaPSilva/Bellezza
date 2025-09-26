import { Component } from '@angular/core';
import { IonContent,IonButton} from '@ionic/angular/standalone';
import { Router ,RouterLink } from '@angular/router';
 
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonContent,IonButton,RouterLink],
})
export class HomePage {
  constructor(private router: Router) {}
  IrParaDetalhes(){
    this.router.navigateByUrl('/details')
  }
 
 
}
 
 
