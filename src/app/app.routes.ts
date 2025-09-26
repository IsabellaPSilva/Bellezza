import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'details',
    loadComponent: () => import('./pages/details/details.page').then((m) => m.DetailsPage),
  },
  {
    path: 'cadastro-cliente',
    loadComponent: () => import('./home/cadastro-cliente.page').then((m) => m.CadastroClientePage),
  },
  {
    path: 'ativar-localizacao',
    loadComponent: () => import('./home/ativar-localizacao.page').then((m) => m.AtivarLocalizacaoPage),
  },
  {
  path: 'perfil',
  loadComponent: () => import('./home/perfil.page').then(m => m.PerfilPage),
},
];
