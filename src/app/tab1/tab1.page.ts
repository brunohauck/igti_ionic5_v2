import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoadingController, NavController, AlertController } from '@ionic/angular';
import { User } from '../model/user';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  users: User[];
  loading: any; 
  constructor( private service: UserService,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public alertController: AlertController) {}

    ionViewDidEnter(){
      sessionStorage.clear();
      // executa a função getUsers
      this.getUsers();
  }

  getUsers(): void {
    // executa a função para mostrar o loading
    this.presentLoading().then(() => {
      this.service.getUsers()
      .subscribe(
        // no caso de sucesso 
        users =>{
          // atribui o retorno a nossa lista de usuários
          this.users = users;
          // para o loading
          this.loading.dismiss();
        },
        error => {
          this.loading.dismiss();
          this.presentAlert("Ocorreu algum erro.")
        } );
    });
  }
  seleciona(user: User){
    sessionStorage.setItem("user", JSON.stringify(user));
    this.navCtrl.navigateRoot('tab3');
  }
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Carregando Usuários',
      duration: 2000
    });
    await this.loading.present();
  }
  async presentAlert(msg:string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }
}
