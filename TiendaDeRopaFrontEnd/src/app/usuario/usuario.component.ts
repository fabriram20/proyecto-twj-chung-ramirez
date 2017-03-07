import {Component, OnInit} from '@angular/core';
import {MasterUrlService} from "../services/master-url.service";
import {Http, Response} from "@angular/http";
import {NgForm} from "@angular/forms";

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

  constructor(private _http: Http, private _masterURL: MasterUrlService) {
  }

  ngOnInit() {
  }

  iniciarSesion(formulario: NgForm) {
    this._http.get(this._masterURL.url + "Usuario").subscribe(
      (res) => {
        console.log(res.json().filter(function (value, key) {
          return key == "correo" && value == formulario.value.correo
        }))
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
          nombres: formulario.value.nombre,
          apellidos: formulario.value.cantidad,
          correo: formulario.value.peso,
          password: formulario.value.password,
          idCarrito: carrito.id
        }).subscribe(
          (res) => {
            console.log(res);
            this.nuevoUsuario = {};
          },
          (err) => {
            console.log("Ocurrió un error", err);
          },
        );
      },
      (err) => {
        console.log("Ocurrió un error", err);
      }
    );
  }
}
