  import { Routes } from '@angular/router';
  import { AgendamentosPage } from './agendamento/agendamento.page';
  import { LocalizacaoPage } from './localizacao/localizacao.page';
  import { LocalizacaoPPage } from './localizacaoP/localizacaoP.page';
  import { ReservaPage } from './reservas/reserva.page';
  import { ReservaPPage } from './reservaP/reservaP.page';
  import { CalendarioPPage } from './calendarioP/calendarioP.page';
  import { CalendarioPage } from './agendamento/calendario/calendario.page';
  import { ServicosPage } from './servicos/servicos.page';
  import { NgModule } from '@angular/core';
  import { RouterModule } from '@angular/router';
 
  export const routes: Routes = [
    {path: 'agendamentos', component: AgendamentosPage },
    {path: 'localizacao', component: LocalizacaoPage },
    {path: 'servicos', component: ServicosPage },
    {path: 'localizacaoP', component: LocalizacaoPPage },
    {path: 'reserva', component: ReservaPage },
    {path: 'reservaP', component: ReservaPPage },
    {path: 'calendarioP', component: CalendarioPPage },
    {path: 'calendario', component: CalendarioPage },
    {path: 'login',loadComponent: () => import('./login/login.page').then(m => m.LoginPage)},
    {path: 'login-profissional',loadComponent: () => import('./login/login-profissional.page').then(m => m.LoginProfissionalPage)},
    {path: 'home',loadComponent: () => import('./home/home.page').then((m) => m.HomePage),},
    {path: '',redirectTo: 'home',pathMatch: 'full',},
    {path: 'details',loadComponent: () => import('./pages/details/details.page').then((m) => m.DetailsPage),},
    {path: 'cadastro-cliente',loadComponent: () => import('./home/cadastro-cliente.page').then((m) => m.CadastroClientePage),},
    {path: 'ativar-localizacao',loadComponent: () => import('./home/ativar-localizacao.page').then((m) => m.AtivarLocalizacaoPage),},
    {path: 'perfil',loadComponent: () => import('./home/perfil.page').then(m => m.PerfilPage),},
    {path: 'agendamento-home',loadComponent: () => import('./home/agendamento-home.page').then(m => m.AgendamentoHomePage)},
    {path: 'agendamento-home-profissional',loadComponent: () => import('./home/agendamento-home-profissional.page').then(m => m.AgendamentoHomePageProfissional)},
    {path: 'categoria',loadComponent: () => import('./home/categoria.page').then(m => m.CategoriaPage)},
    {path: 'agendamento',loadComponent: () => import('./agendamento/agendamento.page').then(m => m.AgendamentosPage)},
    {path: 'cadastro-profissional',loadComponent: () => import('./home/cadastro-profissional.page').then((m) => m.CadastroProfissionalPage),},
    {path: 'detalhes-salao', loadComponent: () => import('./home/detalhes-salao.page').then(m => m.DetalhesSalaoPage)},
    {path: 'salao',loadComponent: () => import('./home/salao.page').then(m => m.SalaoPage)},
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioPPageRoutingModule {}
 