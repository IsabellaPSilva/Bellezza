import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-perfilP',
  templateUrl: './perfilP.page.html',
  styleUrls: ['./perfilP.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class perfilPPage {
  editando = false;

  usuario = {
    nome: 'Rafaela Dias',
    empresa: 'Salão Mãe & Filhas',
    profissao: 'Cabeleireira e Manicure',
    endereco: 'Rua Waldemar da Costa Rios, Centro, 144',
    descricao: `Salão de beleza Mãe & Filhas, é um salão família voltado para o público feminino, com especialidade em cabelos afros.
Atendimento com hora marcada!!
Maquiagem: 120   Aplique humano: 800/1500
Sobrancelha: 80   Cabelo orgânico: 350/500
Finalização: 150   Unha em gel: 80/150
Manicure: 35`,
    senha: '123456',
    genero: 'feminino'
  };

  constructor(private alertCtrl: AlertController) {}

  // Botão editar/salvar
  async toggleEdicao() {
    if (!this.editando) {
      this.editando = true;

      const alert = await this.alertCtrl.create({
        header: 'Modo de edição ativado',
        message: 'Agora você pode editar suas informações.',
        buttons: ['Ok']
      });
      await alert.present();
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Salvar alterações',
        message: 'Deseja salvar as mudanças feitas no perfil?',
        buttons: [
          { text: 'Cancelar', role: 'cancel' },
          {
            text: 'Salvar',
            handler: async () => {
              this.editando = false;
              const success = await this.alertCtrl.create({
                header: 'Sucesso!',
                message: 'Perfil atualizado com sucesso!',
                buttons: ['Ok']
              });
              await success.present();
            }
          }
        ]
      });
      await alert.present();
    }
  }

  async confirmarSaida() {
    const alert = await this.alertCtrl.create({
      header: 'Sair da conta',
      message: 'Tem certeza que deseja sair?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Sair',
          handler: () => {
            console.log('Usuário saiu');
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmarExclusao() {
    const alert = await this.alertCtrl.create({
      header: 'Excluir conta',
      message: 'Essa ação é permanente. Deseja realmente excluir sua conta?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: async () => {
            const sucesso = await this.alertCtrl.create({
              header: 'Conta excluída',
              message: 'Sua conta foi removida com sucesso.',
              buttons: ['Ok']
            });
            await sucesso.present();
          }
        }
      ]
    });
    await alert.present();
  }
}
  