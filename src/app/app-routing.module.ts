import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { GuardGuard } from './servicios/guard.guard';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyCA9X0qACfjET4CxsyTtcMLkB6pBkuLm2w",
  authDomain: "mi-portfolio-fae87.firebaseapp.com",
  projectId: "mi-portfolio-fae87",
  storageBucket: "mi-portfolio-fae87.appspot.com",
  messagingSenderId: "337141617057",
  appId: "1:337141617057:web:ef0959df76198130d17be0",
  measurementId: "G-950H614F9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const routes: Routes = [
  {path:`portfolio`, component:PortfolioComponent, canActivate:[GuardGuard]}, 
  {path:`iniciar-sesion`, component:IniciarSesionComponent},
  {path: ``, redirectTo:`iniciar-sesion`, pathMatch:`full`}

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
