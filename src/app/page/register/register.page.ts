import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, public toastController:ToastController, private router: Router) { }

  register() {
    this.authService.register(this.email, this.password)
      .then(() => {
        this.router.navigateByUrl('/tab-inicial/inicio'); // Redirigir al home después de registrarse
      })
      .catch(error => {
        console.error("Error en registro", error);
        this.presentToast("middle","Ocurrio un error, re-ingrese sus credenciales.",5000);

      });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msg:string, duration?:number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration?duration:2500,
      position: position,
    });

    await toast.present();
  }

  ngOnInit() {
  }

}
