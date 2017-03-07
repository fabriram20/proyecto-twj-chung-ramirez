import {Component, OnInit} from '@angular/core';
import {MasterUrlService} from "../services/master-url.service";
import {Http, Response} from "@angular/http";
import {NgForm} from "@angular/forms";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

// declare function require(name:string);

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  // Passwords = require('machinepack-passwords');
  inicioUsuario = {};
  nuevoUsuario = {};
  forms = {
    mostrarNuevoClienteForm: false,
    errorLogin: false
  };

  constructor(private _http: Http, private _masterURL: MasterUrlService, private _userLogged: UserService, private _router: Router) {
  }

  ngOnInit() {
  }

  iniciarSesion(formulario: NgForm) {
    this._http.get(this._masterURL.url + "Usuario").subscribe(
      (res) => {
        let usuariosEncontrados = res.json();
        let usuarioLogin;
        usuariosEncontrados.some(function (usuario) {
          if (usuario.correo == formulario.value.correo) {
            usuarioLogin = usuario;
            return true;
          }
        });
        if (usuarioLogin) {
          // this.Passwords.checkPassword({
          //   passwordAttempt: formulario.value.password,
          //   encryptedPassword: usuarioLogin.password
          // }).exec({
          //   // An unexpected error occurred.
          //   error: function (err) {
          //     console.log("Ocurrió un error", err);
          //   },
          //   // Password attempt does not match already-encrypted version
          //   incorrect: function () {
          //     this.forms.errorLogin = true;
          //   },
          //   // OK.
          //   success: function () {
          //     this.forms.errorLogin = false;
          this._userLogged.idUsuario = usuarioLogin.id;
          this._userLogged.idCarrito = usuarioLogin.idCarrito;
          console.log(this._userLogged.idUsuario);
          this._router.navigateByUrl('home');
          //   },
          // });
        }
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
            this._userLogged.idCarrito = carrito.id;
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
