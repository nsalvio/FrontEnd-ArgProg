import { Roles } from "../servicios/login.service";

export interface Login {
    usuario: String,
    contrasenia: String,
}

export interface LoginResponse {
    idPersona: number,
    role: Roles
}