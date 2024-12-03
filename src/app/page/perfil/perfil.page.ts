import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: any = null;
  email: string = '';
  password: string = '';
  profileImage: string | undefined;

  constructor(private authService: AuthService, private afAuth: AngularFireAuth,
    private firestore: AngularFirestore, private router: Router) {}
  
  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        this.email = user.email || '';
      } else {
        this.router.navigateByUrl('/login');  // Redirigir al login si no hay usuario
      }
    });
  }

  changeEmail(newEmail: string) {
    const user = this.afAuth.currentUser;
    user.then(u => {
      u?.updateEmail(newEmail).then(() => {
        alert('Correo actualizado');
      }).catch(error => {
        alert('Error al actualizar correo: ' + error.message);
      });
    });
  }

  changePassword(newPassword: string) {
    const user = this.afAuth.currentUser;
    user.then(u => {
      u?.updatePassword(newPassword).then(() => {
        alert('Contraseña actualizada');
      }).catch(error => {
        alert('Error al actualizar contraseña: ' + error.message);
      });
    });
  }

}
