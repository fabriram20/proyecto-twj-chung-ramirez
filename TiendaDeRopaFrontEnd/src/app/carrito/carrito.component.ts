import {Component, OnInit} from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  cliente = {};
  productos = [];
  total: number;
  hidden = {
    carritoVacio: true,
    sesionIniciada: false
  }

  constructor(private _http: Http, private _masterURL: MasterUrlService, private _userService: UserService) {
  }

  ngOnInit() {
    if (this._userService.idUsuario) {
      this.hidden.sesionIniciada = true;
      // Peticion de productos
      this._http.get(this._masterURL.url + "Carrito/" + this._userService.idCarrito + "/productos").subscribe(
        (res: Response) => {
          this.productos = res.json();
          if(this.productos.length > 0){
            this.hidden.carritoVacio = false;
          }
          this.total = 0;
          for (let producto of this.productos) {
            this.total += producto.precio;
          }
        },
        (err) => {
          console.log(err);
        }
      );
      this._http.get(this._masterURL.url + "Usuario/" + this._userService.idUsuario).subscribe(
        (res: Response) => {
          this.cliente = res.json();
        },
        (err) => {
          console.log(err);
        }
      );    }
  }

  quitarDelCarrito(id: number) {
    this._http.delete(this._masterURL.url + "Carrito/" + this._userService.idCarrito + "/productos/" + id).subscribe(
      (res) => {
        let nuevaLista = res.json();
        this.productos = nuevaLista.productos;
        if(this.productos.length == 0){
          this.hidden.carritoVacio = true;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

