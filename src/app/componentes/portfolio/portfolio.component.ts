import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  constructor(private loginService: LoginService, private ruta: Router) { }

  ngOnInit(): void {
    if(!this.loginService.isAuthenticated()){
      this.ruta.navigate(['/']);
    }

  }

}
