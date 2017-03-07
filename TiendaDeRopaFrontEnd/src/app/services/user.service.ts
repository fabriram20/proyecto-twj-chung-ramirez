import {Injectable} from '@angular/core';

@Injectable()
export class UserService {

  private _idUsuario: number;
  private _idCarrito: number;

  constructor() {
  }

  get idUsuario(): number {
    return this._idUsuario;
  }

  set idUsuario(value: number) {
    this._idUsuario = value;
  }

  get idCarrito(): number {
    return this._idCarrito;
  }

  set idCarrito(value: number) {
    this._idCarrito = value;
  }
}
