import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent {

  //Inyeccion del servicio login
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  onLogin(): void {
    this.authService.login('jjmuesesq@unal.edu.co', 'jjmq1234')
      .subscribe( user => {
        this.router.navigate(['/']);
      });
  }
}
