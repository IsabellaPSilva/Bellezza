import { Injectable } from '@angular/core';
 
export interface Service {
  name: string;
  price: string;
}
 
export interface SocialMedia {
  whatsapp: string;
  instagram: string;
  facebook: string;
}
 
export interface SalonData {
  // Informações básicas
  name: string;
  description: string;
  username: string;
  profession: string;
  address: string;
  appointmentNotice: string;
 
  // Imagens
  headerImage: string;
  logoImage: string;
  galleryImages: string[];
 
  // Serviços e Redes Sociais
  services: Service[];
  socialMedia: SocialMedia;
 
  // Dados extras para avaliações (modo cliente)
  initials?: string;
  professionalName?: string;
  professionalRole?: string;
  appointmentText?: string;
  images?: string[];
}
 
@Injectable({
  providedIn: 'root'
})
export class SalonDataService {
  private readonly STORAGE_KEY = 'salon_data';
 
  constructor() {
    // Inicializa com dados padrão se não existir
    if (!this.getSalonData()) {
      this.initializeDefaultData();
    }
  }
 
  /**
   * Inicializa dados padrão
   */
  private initializeDefaultData(): void {
    const defaultData: SalonData = {
      name: 'Salão Mãe & Filhas',
      description: 'Salão de beleza Mãe & Filhas, é um salão família. voltada para o público feminino, com especialidade em cabelos afros.',
      username: 'Isabella',
      profession: 'Cabeleireira Profissional',
      address: 'Rua das Flores, 123 - Centro, São José dos Pinhais - PR',
      appointmentNotice: 'Atendimento com hora marcada !!',
      headerImage: '',
      logoImage: '',
      galleryImages: [],
      services: [],
      socialMedia: {
        whatsapp: '',
        instagram: '',
        facebook: ''
      }
    };
   
    this.saveSalonData(defaultData);
  }
 
  /**
   * Obtém todos os dados do salão
   */
  getSalonData(): SalonData | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erro ao carregar dados do salão:', error);
      return null;
    }
  }
 
  /**
   * Salva todos os dados do salão
   */
  saveSalonData(data: SalonData): boolean {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      console.log('✅ Dados do salão salvos com sucesso!');
      return true;
    } catch (error) {
      console.error('❌ Erro ao salvar dados do salão:', error);
      return false;
    }
  }
 
  /**
   * Atualiza apenas as imagens (header, logo, galeria)
   */
  updateImages(headerImage: string, logoImage: string, galleryImages: string[]): boolean {
    const currentData = this.getSalonData();
    if (!currentData) return false;
 
    currentData.headerImage = headerImage;
    currentData.logoImage = logoImage;
    currentData.galleryImages = galleryImages;
 
    return this.saveSalonData(currentData);
  }
 
  /**
   * Atualiza informações básicas
   */
  updateBasicInfo(name: string, description: string, username: string, profession: string, address: string, appointmentNotice: string): boolean {
    const currentData = this.getSalonData();
    if (!currentData) return false;
 
    currentData.name = name;
    currentData.description = description;
    currentData.username = username;
    currentData.profession = profession;
    currentData.address = address;
    currentData.appointmentNotice = appointmentNotice;
 
    return this.saveSalonData(currentData);
  }
 
  /**
   * Atualiza redes sociais
   */
  updateSocialMedia(socialMedia: SocialMedia): boolean {
    const currentData = this.getSalonData();
    if (!currentData) return false;
 
    currentData.socialMedia = socialMedia;
    return this.saveSalonData(currentData);
  }
 
  /**
   * Adiciona uma imagem na galeria
   */
  addGalleryImage(imageUrl: string): boolean {
    const currentData = this.getSalonData();
    if (!currentData) return false;
 
    if (currentData.galleryImages.length >= 10) {
      console.warn('⚠️ Limite de 10 imagens atingido');
      return false;
    }
 
    currentData.galleryImages.push(imageUrl);
    return this.saveSalonData(currentData);
  }
 
  /**
   * Remove uma imagem da galeria
   */
  removeGalleryImage(index: number): boolean {
    const currentData = this.getSalonData();
    if (!currentData) return false;
 
    if (index >= 0 && index < currentData.galleryImages.length) {
      currentData.galleryImages.splice(index, 1);
      return this.saveSalonData(currentData);
    }
 
    return false;
  }
 
  /**
   * Obtém as iniciais do nome do salão
   */
  getSalonInitials(): string {
    const data = this.getSalonData();
    if (!data || !data.name) {
      return 'M&F';
    }
 
    return data.name
      .split(' ')
      .filter(word => word.length > 0)
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 3);
  }
 
  /**
   * Limpa todos os dados do salão (útil para logout/reset)
   */
  clearSalonData(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.initializeDefaultData();
  }
 
  /**
   * Verifica se existem dados salvos
   */
  hasData(): boolean {
    return this.getSalonData() !== null;
  }
}