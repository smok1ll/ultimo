import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  
  constructor(public router:Router, public toastController:ToastController,private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.router.navigateByUrl('/tab-inicial/inicio'); // Redirigir al home después de loguearse
        this.presentToast("top","Bienvenid@");
      })
      .catch(error => {
        console.error("Error en login", error);
        this.presentToast("middle","Error",5000);
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

}
