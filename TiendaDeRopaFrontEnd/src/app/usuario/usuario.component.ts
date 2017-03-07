import {Component, OnInit} from '@angular/core';
import {MasterUrlService} from "../services/master-url.service";
import {Http, Response} from "@angular/http";
import {NgForm} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  inicioUsuario = {};
  nuevoUsuario = {};
  forms = {
    mostrarNuevoClienteForm: false
  };

  constructor(private _http: Http, private _masterURL: MasterUrlService, private _userLogged: UserService, private _router: Router) {
  }

  ngOnInit() {
  }

  iniciarSesion(formulario: NgForm) {
    this._http.get(this._masterURL.url + "Usuario").subscribe(
      (res) => {
        console.log(res.json());
      },
      (err) => {
        console.log("Ocurrió un error", err);
      }
    );
  }

  crearUsuario(formulario: NgForm) {
    this._http.post(this._masterURL.url + "Carrito", {}).subscribe(
      (res) => {
        let carrito = res.json();
        this._http.post(this._masterURL.url + "Usuario", {
          nombres: formulario.value.nombres,
          apellidos: formulario.value.apellidos,
          correo: formulario.value.correo,
          password: formulario.value.password,
          idCarrito: carrito.id
        }).subscribe(
          (res) => {
            console.log(res);
            this.nuevoUsuario = {};
            this._userLogged.idUsuario = res.json().id;
            console.log(this._userLogged.idUsuario);
            this._router.navigateByUrl('home');
          },
          (err) => {
            console.log("Ocurrió un error", err);
            this._http.delete(this._masterURL.url + "Carrito/" + carrito.id).subscribe(
              (err) => {
                console.log("Ocurrió un error", err);
              }
            );
          },
        );
      },
      (err) => {
        console.log("Ocurrió un error", err);
      }
    );
  }
}
