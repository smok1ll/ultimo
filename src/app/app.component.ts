import { Component, OnInit  } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  userSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router,) {}

  

  ngOnInit() {
    this.userSubscription = this.authService.getUser().subscribe(user => {
      if (user) {
        console.log("Usuario autenticado:", user);
        this.router.navigateByUrl('/tab-inicial/inicio'); // Si está autenticado, ir al home
      } else {
        console.log("No hay usuario autenticado");
        this.router.navigateByUrl('/login'); // Si no está autenticado, ir al login
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe(); // Limpiar la suscripción
    }
  }
}

