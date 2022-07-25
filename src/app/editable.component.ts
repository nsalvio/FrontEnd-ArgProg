import { LoginService, Roles } from "./servicios/login.service";

export class EditableComponent {
    protected idPersona: number;

    constructor(protected loginService: LoginService){
      this.idPersona =this.loginService.getIdPersona()! ;
    }
    
    public canEdit(){
      return this.loginService.getRole() === Roles.Admin;
    }
  
    public isAuthenticated(){
      return this.loginService.isAuthenticated();
    }

    public getFormattedDate = (input: string | Date | number) => (new Date(input)).toLocaleDateString('es-AR');
  }