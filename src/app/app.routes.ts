  import { Routes } from '@angular/router';
  import { AgendamentosPage } from './agendamento/agendamento.page';
  import { LocalizacaoPage } from './localizacao/localizacao.page';
  import { ReservaPage } from './reservas/reserva.page';
  import { reservaPPage } from './reservaP/reservaP.page';

  export const routes: Routes = [
    {path: '', component: AgendamentosPage },
    {path: 'localizacao', component: LocalizacaoPage },
    {path: 'reserva', component: ReservaPage },
    {path: 'reservaP', component: reservaPPage },
    {path: 'home',loadComponent: () => import('./home/home.page').then((m) => m.HomePage),},
    {path: '',redirectTo: 'home',pathMatch: 'full',},
    {path: 'details',loadComponent: () => import('./pages/details/details.page').then((m) => m.DetailsPage),},
    {path: 'cadastro-cliente',loadComponent: () => import('./home/cadastro-cliente.page').then((m) => m.CadastroClientePage),},
    {path: 'ativar-localizacao',loadComponent: () => import('./home/ativar-localizacao.page').then((m) => m.AtivarLocalizacaoPage),},
    {path: 'perfil',loadComponent: () => import('./home/perfil.page').then(m => m.PerfilPage),},
    {path: 'agendamento-home',loadComponent: () => import('./home/agendamento-home.page').then(m => m.AgendamentoHomePage)},
    {path: 'agendamento-home-profissional',loadComponent: () => import('./home/agendamento-home-profissional.page').then(m => m.AgendamentoHomePageProfissional)},
    {path: 'categoria',loadComponent: () => import('./home/categoria.page').then(m => m.CategoriaPage)}
];