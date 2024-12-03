import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-restore',
  templateUrl: './restore.page.html',
  styleUrls: ['./restore.page.scss'],
})
export class RestorePage implements OnInit {
  email: string = '';


  constructor(private authService: AuthService,
    private router: Router,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async sendResetEmail() {
    if (this.email) {
      try {
        await this.authService.sendPasswordResetEmail(this.email);
        this.presentAlert('Éxito', 'Se ha enviado un enlace para restablecer tu contraseña al correo electrónico.');
        this.router.navigateByUrl('/login');
      } catch (error) {
        this.presentAlert('Error', 'Hubo un problema al enviar el correo de recuperación. Asegúrate de que el correo esté registrado.');
      }
    } else {
      this.presentAlert('Error', 'Por favor ingresa tu correo electrónico.');
    }
  }

  // Método para mostrar alertas
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
