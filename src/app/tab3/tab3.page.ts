import { Component } from "@angular/core";
import { first } from 'rxjs/operators';
import { ToastController, NavController } from '@ionic/angular';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  user: User;
  error: string;
  title: string;
  flagEdit: boolean = false;
  constructor(
    private service: UserService,
    public toastController: ToastController,
    public navCtrl: NavController
  ) {
    // nesse momento temos que instaciar nosso objeto de usuário pois estamos usando ele em nosso HTML
    // caso isso não seja feito vai gerar um erro
    this.user = new User(null, null, null, null, null, null, null);
    // caso esteja editando vai mudar o título da página e do botã
    if (sessionStorage.getItem("user")) {
      this.flagEdit = true;
      this.title = "Editar";
      this.user = JSON.parse(sessionStorage.getItem("user"));
      console.log(this.user);
    } else {
      this.title = "Cadastrar";
    }
  }
  submit() {
    if (this.user.name == "" || this.user.name == null) {
      this.presentToast("O nome é obrigatório");
    } else if (this.user.username == "" || this.user.username == null) {
      this.presentToast("O username é obrigatório");
    } else if (this.user.phone == "" || this.user.phone == null) {
      this.presentToast("O celular ou telefone é obrigatório");
    } else {
      if (sessionStorage.getItem("user")) {
        this.service
          .editUser(this.user)
          .pipe(first())
          .subscribe(
            (response) => {
              console.log(response);
              this.navCtrl.navigateRoot("");
            },
            (err) => {
              console.log(err);
              return (this.error = "Erro de conexão!");
            }
          );
      } else {
        this.user.img_url =
          "https://cdn.iconscout.com/icon/free/png-256/avatar-375-456327.png";
        this.service
          .addUser(this.user)
          .pipe(first())
          .subscribe(
            (response) => {
              console.log(response);
              this.navCtrl.navigateRoot("");
            },
            (err) => {
              console.log(err);
              return (this.error = "Erro de conexão!");
            }
          );
      }
    }
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
  delete() {
    this.service
      .deleteUser(this.user)
      .pipe(first())
      .subscribe(
        (response) => {
          console.log(response);
        },
        (err) => {
          console.log(err);
          return (this.error = "Erro de conexão!");
        }
      );
  }
}
