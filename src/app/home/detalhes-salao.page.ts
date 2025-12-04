import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonButton,
  IonIcon,
  ToastController,
  
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { RouterLink } from '@angular/router';
import {
  arrowBack,
  star,
  starOutline,
  cutOutline,
  locationOutline
} from 'ionicons/icons';
// ✅ CORRETO: Mesmo diretório (home/)
import { SalonDataService } from './salondata.service';
 
export interface SalonData {
  initials: string;
  title: string;
  description: string;
  professionalName: string;
  professionalRole: string;
  address: string;
  appointmentText: string;
  images: string[];
  logoUrl?: string;
}
 
@Component({
  selector: 'app-salao-detalhes',
  templateUrl: './detalhes-salao.page.html',
  styleUrls: ['./detalhes-salao.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonButton,
    IonIcon,
    RouterLink,
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetalhesSalaoPage {
 
  /** Dados exibidos na tela */
  salonData: SalonData = {
    initials: '',
    title: '',
    description: '',
    professionalName: '',
    professionalRole: '',
    address: '',
    appointmentText: '',
    images: [],
    logoUrl: ''
  };
 
  avaliacoes = [
    { estrelas: 5, quantidade: 80 },
    { estrelas: 4, quantidade: 15 },
    { estrelas: 3, quantidade: 3 },
    { estrelas: 2, quantidade: 1 },
    { estrelas: 1, quantidade: 1 }
  ];
 
  selectedRating = 0;
 
  constructor(
    private toastCtrl: ToastController,
    private salonDataService: SalonDataService
  ) {
    addIcons({
      arrowBack,
      star,
      starOutline,
      cutOutline,
      locationOutline
    });
  }
 
  ngOnInit() {
    this.loadSalonData();
  }

  ionViewWillEnter() {
    // Recarrega os dados toda vez que a página é visitada
    this.loadSalonData();
  }
 
  /**
   * Carrega os dados do salão salvos pelo profissional
   */
  loadSalonData() {
    const savedData = this.salonDataService.getSalonData();
   
    if (savedData) {
      // Mapeia os dados do serviço para o formato da página de detalhes
      this.salonData = {
        initials: this.salonDataService.getSalonInitials(),
        title: savedData.name || '',
        description: savedData.description || '',
        professionalName: savedData.username || '',
        professionalRole: savedData.profession || '',
        address: savedData.address || '',
        appointmentText: savedData.appointmentNotice || '',
        images: savedData.galleryImages || [],
        logoUrl: savedData.logoImage || ''
      };
 
      console.log('✅ Dados do salão carregados (modo cliente):', this.salonData);
    } else {
      console.warn('⚠️ Nenhum dado encontrado no serviço, usando dados padrão');
      // Mantém os dados padrão já definidos
    }
  }
 
  async setRating(star: number) {
    this.selectedRating = star;
    const toast = await this.toastCtrl.create({
      message: `✨ Você avaliou com ${star} estrela${star > 1 ? 's' : ''}!`,
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    toast.present();
  }
 
  getProgressWidth(qtd: number): string {
    const total = this.getTotalReviews();
    return `${(qtd / total) * 100}%`;
  }
 
  getTotalReviews(): number {
    return this.avaliacoes.reduce((acc, cur) => acc + cur.quantidade, 0);
  }
} 
 