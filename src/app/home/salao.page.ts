import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonTabBar, IonTabButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import {
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon,
  IonTitle, IonContent, IonFooter, IonGrid, IonRow, IonCol, IonItem, IonLabel,
  IonInput, IonTextarea, IonNote, IonLoading, AlertController, ToastController, LoadingController, 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  shareOutline, pencilOutline, closeOutline, checkmarkOutline,
  camera, add, trashOutline, images, close, saveOutline, home, calendar, person,
  storefront, cutOutline, logoWhatsapp, logoInstagram, logoFacebook,
  lockClosedOutline, lockOpenOutline, checkmarkCircleOutline, keyOutline,
  chevronDown, chevronUp, briefcaseOutline, locationOutline
} from 'ionicons/icons';
 
interface Service {
  name: string;
  price: string;
}
 
interface SocialMedia {
  whatsapp: string;
  instagram: string;
  facebook: string;
}
 
interface SalonData {
  name: string;
  description: string;
  username: string;
  profession: string;
  address: string;
  appointmentNotice: string;
  services: Service[];
  galleryImages: string[];
  socialMedia: SocialMedia;
}
 
interface PasswordChange {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
 
@Component({
  selector: 'app-salao',
  templateUrl: './salao.page.html',
  styleUrls: ['./salao.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonButton, IonIcon,
    IonTitle, IonContent, IonFooter, IonGrid, IonRow, IonCol, IonItem, IonLabel,
    IonInput, IonTextarea, IonNote, IonLoading, IonTabBar,
    IonTabButton,
    IonHeader, IonBackButton, IonButton, IonIcon,IonContent, IonFooter,IonItem,
    IonInput, IonTextarea, IonNote

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SalaoPage implements OnInit {
  // Controle de Modo
  isEditMode = false;
  isLoading = false;
  isFormValid = true;
 
  // Imagens
  headerImage = '';
  logoImage = '';
 
  // Backup dos dados originais
  originalSalonData: any;
  originalHeaderImage = '';
  originalLogoImage = '';
 
  // Dados de alteração de senha
  passwordChange: PasswordChange = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  showPasswordSection = false;
 
  // Dados do Salão
  salonData: SalonData = {
    name: 'Salão Mãe & Filhas',
    description: 'Salão de beleza Mãe & Filhas, é um salão família. voltada para o público feminino, com especialidade em cabelos afros.',
    username: 'Isabella',
    profession: 'Cabeleireira Profissional',
    address: 'Rua das Flores, 123 - Centro, São José dos Pinhais - PR',
    appointmentNotice: 'Atendimento com hora marcada !!',
    services: [
      { name: 'Maquiagem', price: '120' },
      { name: 'Sobrancelha', price: '80' },
      { name: 'Finalização', price: '150' },
      { name: 'Manicure', price: '35' },
      { name: 'Aplique humano', price: '800/1500' },
      { name: 'Cabelo orgânico', price: '350/500' },  
      { name: 'Unha em gel', price: '80/150' }
    ],
    galleryImages: [],
    socialMedia: {
      whatsapp: '',
      instagram: '',
      facebook: ''
    }
  };
 
  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    addIcons({
      'share-outline': shareOutline,
      'pencil-outline': pencilOutline,
      'close-outline': closeOutline,
      'checkmark-outline': checkmarkOutline,
      'camera': camera,
      'add': add,
      'trash-outline': trashOutline,
      'images': images,
      'close': close,
      'save-outline': saveOutline,
      'home': home,
      'calendar': calendar,
      'person': person,
      'storefront': storefront,
      'cut-outline': cutOutline,
      'logo-whatsapp': logoWhatsapp,
      'logo-instagram': logoInstagram,
      'logo-facebook': logoFacebook,
      'lock-closed-outline': lockClosedOutline,
      'lock-open-outline': lockOpenOutline,
      'checkmark-circle-outline': checkmarkCircleOutline,
      'key-outline': keyOutline,
      'chevron-down': chevronDown,
      'chevron-up': chevronUp,
      'briefcase-outline': briefcaseOutline,
      'location-outline': locationOutline
    });
  }
 
  ngOnInit() {
    this.loadSalonData();
  }
 
  loadSalonData() {
    console.log('Dados do salão carregados');
  }
 
  get salonInitials(): string {
    if (!this.salonData.name) {
      return 'M&F';
    }
 
    return this.salonData.name
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 3);
  }
 
  // ============================================
  // MÉTODOS PARA REDES SOCIAIS
  // ============================================
  openWhatsApp() {
    const phone = this.salonData.socialMedia.whatsapp;
    if (phone) {
      const cleanPhone = phone.replace(/\D/g, '');
      window.open(`https://wa.me/${cleanPhone}`, '_blank');
    } else {
      this.showToast('WhatsApp não configurado', 'warning');
    }
  }
 
  openInstagram() {
    const username = this.salonData.socialMedia.instagram;
    if (username) {
      const cleanUsername = username.replace('@', '');
      window.open(`https://instagram.com/${cleanUsername}`, '_blank');
    } else {
      this.showToast('Instagram não configurado', 'warning');
    }
  }
 
  openFacebook() {
    const url = this.salonData.socialMedia.facebook;
    if (url) {
      window.open(url, '_blank');
    } else {
      this.showToast('Facebook não configurado', 'warning');
    }
  }
 
  // ============================================
  // MODO EDIÇÃO
  // ============================================
  enableEditMode() {
    this.originalSalonData = JSON.parse(JSON.stringify(this.salonData));
    this.originalHeaderImage = this.headerImage;
    this.originalLogoImage = this.logoImage;
    this.resetPasswordFields();
    this.isEditMode = true;
  }
 
  async cancelEdit() {
    const alert = await this.alertController.create({
      header: 'Cancelar edição',
      message: 'Deseja descartar as alterações?',
      buttons: [
        { text: 'Não', role: 'cancel' },
        { text: 'Sim, descartar', role: 'confirm' }
      ]
    });
 
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role === 'confirm') {
      this.salonData = JSON.parse(JSON.stringify(this.originalSalonData));
      this.headerImage = this.originalHeaderImage;
      this.logoImage = this.originalLogoImage;
      this.resetPasswordFields();
      this.isEditMode = false;
      await this.showToast('Alterações descartadas', 'medium');
    }
  }
 
  // ============================================
  // UPLOAD DE IMAGENS
  // ============================================
  onHeaderImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.showToast('Por favor, selecione uma imagem válida', 'warning');
        return;
      }
 
      if (file.size > 5 * 1024 * 1024) {
        this.showToast('A imagem deve ter no máximo 5MB', 'warning');
        return;
      }
 
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.headerImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
 
  onLogoImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.showToast('Por favor, selecione uma imagem válida', 'warning');
        return;
      }
 
      if (file.size > 2 * 1024 * 1024) {
        this.showToast('O logo deve ter no máximo 2MB', 'warning');
        return;
      }
 
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.logoImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
 
  // ============================================
  // GERENCIAMENTO DE SERVIÇOS
  // ============================================
  addService() {
    this.salonData.services.push({
      name: '',
      price: ''
    });
  }
 
  async removeService(index: number) {
    const serviceName = this.salonData.services[index].name || 'este serviço';
    const alert = await this.alertController.create({
      header: 'Remover serviço',
      message: `Deseja remover "${serviceName}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Remover', role: 'destructive' }
      ]
    });
 
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role === 'destructive') {
      this.salonData.services.splice(index, 1);
      await this.showToast('Serviço removido', 'medium');
    }
  }
 
  // ============================================
  // GALERIA DE FOTOS
  // ============================================
  addGalleryImage() {
    if (this.salonData.galleryImages.length >= 10) {
      this.showToast('Você já atingiu o limite de 10 fotos', 'warning');
      return;
    }
 
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          this.showToast('Por favor, selecione uma imagem válida', 'warning');
          return;
        }
 
        if (file.size > 5 * 1024 * 1024) {
          this.showToast('A imagem deve ter no máximo 5MB', 'warning');
          return;
        }
 
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.salonData.galleryImages.push(event.target.result);
          this.showToast('Imagem adicionada', 'success');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }
 
  openGalleryImagePicker(index: number) {
    const input = document.getElementById('galleryImage' + index) as HTMLInputElement;
    if (input) {
      input.click();
    }
  }
 
  onGalleryImageSelected(event: any, index: number) {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        this.showToast('Por favor, selecione uma imagem válida', 'warning');
        return;
      }
 
      if (file.size > 5 * 1024 * 1024) {
        this.showToast('A imagem deve ter no máximo 5MB', 'warning');
        return;
      }
 
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.salonData.galleryImages[index] = e.target.result;
        this.showToast('Imagem atualizada', 'success');
      };
      reader.readAsDataURL(file);
    }
  }
 
  async removeGalleryImage(index: number) {
    const alert = await this.alertController.create({
      header: 'Remover foto',
      message: 'Deseja remover esta foto da galeria?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Remover', role: 'destructive' }
      ]
    });
 
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role === 'destructive') {
      this.salonData.galleryImages.splice(index, 1);
      await this.showToast('Foto removida', 'medium');
    }
  }
 
  // ============================================
  // VALIDAÇÃO E SALVAMENTO
  // ============================================
  validateForm(): boolean {
    if (!this.salonData.name || this.salonData.name.trim() === '') {
      this.showToast('O nome do salão é obrigatório', 'warning');
      return false;
    }
 
    if (!this.salonData.description || this.salonData.description.trim() === '') {
      this.showToast('A descrição é obrigatória', 'warning');
      return false;
    }
 
    if (this.salonData.services.length === 0) {
      this.showToast('Adicione pelo menos um serviço', 'warning');
      return false;
    }
 
    const invalidService = this.salonData.services.find(
      service => !service.name || !service.price ||
        service.name.trim() === '' || service.price.trim() === ''
    );
 
    if (invalidService) {
      this.showToast('Preencha todos os campos dos serviços', 'warning');
      return false;
    }
 
    return true;
  }
 
  async saveChanges() {
    if (!this.validateForm()) {
      return;
    }
 
    const alert = await this.alertController.create({
      header: 'Confirmar alterações',
      message: 'Deseja salvar as alterações realizadas?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Salvar', role: 'confirm' }
      ]
    });
 
    await alert.present();
    const { role } = await alert.onDidDismiss();
    if (role === 'confirm') {
      await this.performSave();
    }
  }
 
  async performSave() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Salvando alterações...',
      spinner: 'crescent'
    });
 
    await loading.present();
 
    try {
      // Simulando requisição - substitua pela sua chamada real de API
      await new Promise((resolve) => setTimeout(resolve, 1500));
 
      // Atualizar backup com os novos dados
      this.originalSalonData = JSON.parse(JSON.stringify(this.salonData));
      this.originalHeaderImage = this.headerImage;
      this.originalLogoImage = this.logoImage;
 
      this.isEditMode = false;
      await this.showToast('Alterações salvas com sucesso!', 'success');
      console.log('Salvamento concluído!');
    } catch (error) {
      console.error('Erro no salvamento:', error);
      await this.showToast('Erro ao salvar alterações', 'danger');
    } finally {
      try {
        await loading.dismiss();
      } catch (e) {
        // se já foi dismiss, ignora
      }
      this.isLoading = false;
    }
  }
 
  // ============================================
  // ALTERAÇÃO DE SENHA
  // ============================================
  resetPasswordFields() {
    this.passwordChange = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    this.showPasswordSection = false;
  }
 
  togglePasswordSection() {
    this.showPasswordSection = !this.showPasswordSection;
    if (!this.showPasswordSection) {
      this.resetPasswordFields();
    }
  }
 
  validatePassword(): boolean {
    if (!this.passwordChange.currentPassword) {
      this.showToast('Digite a senha atual', 'warning');
      return false;
    }
 
    if (!this.passwordChange.newPassword) {
      this.showToast('Digite a nova senha', 'warning');
      return false;
    }
 
    if (this.passwordChange.newPassword.length < 6) {
      this.showToast('A nova senha deve ter no mínimo 6 caracteres', 'warning');
      return false;
    }
 
    if (!this.passwordChange.confirmPassword) {
      this.showToast('Confirme a nova senha', 'warning');
      return false;
    }
 
    if (this.passwordChange.newPassword !== this.passwordChange.confirmPassword) {
      this.showToast('As senhas não coincidem', 'warning');
      return false;
    }
 
    if (this.passwordChange.currentPassword === this.passwordChange.newPassword) {
      this.showToast('A nova senha deve ser diferente da atual', 'warning');
      return false;
    }
 
    return true;
  }
 
  async changePassword() {
    if (!this.validatePassword()) {
      return;
    }
 
    const alert = await this.alertController.create({
      header: 'Alterar senha',
      message: 'Deseja realmente alterar sua senha?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Alterar', role: 'confirm' }
      ]
    });
 
    await alert.present();
    const { role } = await alert.onDidDismiss();
   
    if (role === 'confirm') {
      await this.performPasswordChange();
    }
  }
 
  async performPasswordChange() {
    const loading = await this.loadingController.create({
      message: 'Alterando senha...',
      spinner: 'crescent'
    });
 
    await loading.present();
 
    try {
      // Simulando requisição - substitua pela sua chamada real de API
      await new Promise((resolve) => setTimeout(resolve, 1500));
 
      // Aqui você faria a validação da senha atual e alteração no backend
      // Exemplo: await this.authService.changePassword(this.passwordChange);
 
      this.resetPasswordFields();
      await this.showToast('Senha alterada com sucesso!', 'success');
      console.log('Senha alterada com sucesso!');
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      await this.showToast('Erro ao alterar senha. Verifique a senha atual.', 'danger');
    } finally {
      try {
        await loading.dismiss();
      } catch (e) {
        // se já foi dismiss, ignora
      }
    }
  }
 
  // ============================================
  // COMPARTILHAMENTO
  // ============================================
  async shareContent() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: this.salonData.name,
          text: this.salonData.description,
          url: window.location.href
        });
        this.showToast('Compartilhado com sucesso!', 'success');
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      const url = window.location.href;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(() => {
          this.showToast('Link copiado!', 'success');
        });
      }
    }
  }
 
  // ============================================
  // TOAST
  // ============================================
  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top',
      buttons: [
        {
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
 
    await toast.present();
  }
}