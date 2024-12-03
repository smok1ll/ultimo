import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.getUser().pipe(
      take(1), // Tomar el primer valor
      map(user => !!user), // Convertir el estado del usuario en un booleano
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('/login'); // Si no está autenticado, redirigir al login
        }
      })
    );
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
