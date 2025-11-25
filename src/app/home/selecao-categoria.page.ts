// selecao_categoria.page.ts - COM VALIDAÇÃO

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonIcon, IonLabel, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  handLeftOutline, cutOutline, eyeOutline, sparklesOutline, 
  bodyOutline, flowerOutline, colorPaletteOutline, sunnyOutline 
} from 'ionicons/icons';

interface Categoria {
  id: string;
  nome: string;
  icone: string;
  selecionada: boolean;
}

@Component({
  selector: 'app-selecao-categoria',
  templateUrl: './selecao-categoria.page.html',
  styleUrls: ['./selecao-categoria.page.scss'],
  standalone: true,
  imports: [CommonModule, IonContent, IonButton, IonIcon, IonLabel]
})
export class SelecaoCategoriaPage {
  categorias: Categoria[] = [
    { id: '1', nome: 'Unha', icone: 'hand-left-outline', selecionada: false },
    { id: '2', nome: 'Cabelo', icone: 'cut-outline', selecionada: false },
    { id: '3', nome: 'Cílios', icone: 'eye-outline', selecionada: false },
    { id: '4', nome: 'Sobrancelhas', icone: 'sparkles-outline', selecionada: false },
    { id: '5', nome: 'Pele', icone: 'body-outline', selecionada: false },
    { id: '6', nome: 'Massagens', icone: 'flower-outline', selecionada: false },
    { id: '7', nome: 'Depilação', icone: 'body-outline', selecionada: false },
    { id: '8', nome: 'Maquiagem', icone: 'color-palette-outline', selecionada: false },
    { id: '9', nome: 'Bronzeamento', icone: 'sunny-outline', selecionada: false }
  ];

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({ 
      handLeftOutline, 
      cutOutline, 
      eyeOutline, 
      sparklesOutline,
      bodyOutline, 
      flowerOutline, 
      colorPaletteOutline, 
      sunnyOutline 
    });
  }

  toggleCategoria(categoria: Categoria) {
    categoria.selecionada = !categoria.selecionada;
  }

  async comecar() {
    const categoriasSelecionadas = this.categorias.filter(c => c.selecionada);
    
    // VALIDAÇÃO: Não permite continuar sem selecionar
    if (categoriasSelecionadas.length === 0) {
      const alert = await this.alertController.create({
        header: 'Atenção',
        message: 'Por favor, selecione pelo menos uma categoria para continuar.',
        buttons: ['OK']
      });
      await alert.present();
      return; // PARA aqui, não navega
    }
    
    // Se tiver selecionado, salva e navega
    console.log('Categorias selecionadas:', categoriasSelecionadas);
    localStorage.setItem('categorias_selecionadas', JSON.stringify(categoriasSelecionadas));
    
    // Navegar para próxima tela
    this.router.navigate(['/salao']);
  }
}