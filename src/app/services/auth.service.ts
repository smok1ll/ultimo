import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.setPersistence('local');
  }

  // Registro de usuario
  async register(email: string, password: string): Promise<any> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      console.log("Usuario registrado", userCredential);
      return userCredential;
    } catch (error) {
      console.error("Error en registro", error);
      throw error;
    }
  }

  // Login de usuario
  async login(email: string, password: string): Promise<any> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log("Usuario logueado", userCredential);
      return userCredential;
    } catch (error) {
      console.error("Error en login", error);
      throw error;
    }
  }

  // Cerrar sesión
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log("Sesión cerrada");
      this.router.navigateByUrl('/login'); // Redirigir al login
    } catch (error) {
      console.error("Error en logout", error);
      throw error;
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      console.log('Correo de recuperación enviado a', email);
    } catch (error) {
      console.error('Error al enviar el correo de recuperación', error);
      throw error; // Aquí puedes manejar el error y mostrar un mensaje adecuado
    }
  }

  // Verificar si el usuario está logueado
  getUser(): Observable<any> {
    return this.afAuth.authState; // Devuelve el estado de autenticación
  }
}
