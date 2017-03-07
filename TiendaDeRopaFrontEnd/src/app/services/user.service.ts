import {Injectable} from '@angular/core';

@Injectable()
export class UserService {

  private _idUsuario: number;

  constructor() {
  }

  get idUsuario(): number {
    return this._idUsuario;
  }

  set idUsuario(value: number) {
    this._idUsuario = value;
  }
}
