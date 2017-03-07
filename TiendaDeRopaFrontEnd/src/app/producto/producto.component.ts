import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  admin = false;
  private _parametros: any;
  nuevoProducto = {};
  productos = [];
  categorias = [];

  // disabledButtons = {
  //   NuevatiendaFormSubmitButton: false
  // }
  constructor(private _activatedRoute: ActivatedRoute, private _http: Http, private _masterURL: MasterUrlService, private _userService: UserService) {
  }

  ngOnInit() {
    this._activatedRoute
      .params
      .subscribe(parametros => {
        this._parametros = parametros;
        console.log(parametros);

        if (this._parametros.nombreProducto) {
          // Peticion de productos por busqueda
          this._http.get(this._masterURL.url + 'Producto?where={"nombreProducto":{"contains":"' + this._parametros.nombreProducto + '"}}').subscribe(
            (res: Response) => {
              console.log(res.json());
              this.productos = res.json().map((value) => {
                value.textoAuxiliar = "";
                value.formularioCerrado = true;
                return value;
              });
            },
            (err) => {
              console.log(err);
            }
          )
        } else if (this._parametros.idCategoria) {
          // Peticion de productos por categoria
          this._http.get(this._masterURL.url + "Producto?idCategoria=" + this._parametros.idCategoria).subscribe(
            (res: Response) => {
              this.productos = res.json().map((value) => {
                value.textoAuxiliar = "";
                value.formularioCerrado = true;
                return value;
              });
            },
            (err) => {
              console.log(err);
            }
          )
        }


        // Peticion de categorias
        this._http.get(this._masterURL.url + "Categoria").subscribe(
          (res: Response) => {
            this.categorias = res.json();
          },
          (err) => {
            console.log(err);
          }
        )
      })
    // Comprobar idUsuario
    if (this._userService.idUsuario == 1) {
      this.admin = true;
    }
  }

  crearProducto(formulario: NgForm) {

    console.log(this.nuevoProducto);

    this._http.post(this._masterURL.url + 'Producto', this.nuevoProducto).subscribe(
      (res: Response) => {
        this.productos.push(res.json());
        this.nuevoProducto = {};
        // this.disabledButtons.NuevatiendaFormSubmitButton = false;
      },
      (err) => {
        console.log(err)
        // this.disabledButtons.NuevatiendaFormSubmitButton = false;
      }
    )
  }

  borrarProducto(id: number) {
    this._http.delete(this._masterURL.url + "Producto/" + id).subscribe(
      (res) => {
        let productoBorrado = res.json();
        this.productos = this.productos.filter(value => productoBorrado.id != value.id)
      },
      (err) => {
        console.log(err);
      }
    )
  }


  actualizarProducto(producto: any) {
    let parametros = {
      nombreProducto: producto.value.nombreProducto,
      foto: producto.value.foto,
      precio: producto.value.precio,
      idCategoria: producto.value.idCategoria
    };

    // console.log(parametros.idCategoria);
    // if (parametros.idCategoria.equals('Hombre')) {
    //   parametros.foto = 'Hombre.jpg';
    // } else if (parametros.idCategoria = 'Mujer') {
    //   parametros.foto = 'Mujer.jpg';
    // } else if (parametros.idCategoria = 'Niño') {
    //   parametros.foto = 'Niño.jpg';
    // } else {
    //   parametros.foto = 'Niña.jpg';
    // }


    this._http.put(this._masterURL.url + "Producto/" + producto.id, parametros).subscribe(
      (res: Response) => {
        producto.formularioCerrado = !producto.formularioCerrado;
        console.log("Respuesta: ", res.json());
      },
      (err) => {
        console.log("Error: ", err)
      }
    )
  }

  productoAlCarrito(producto: any) {
    this._http.post(this._masterURL.url + "Carrito/" + this._userService.idCarrito + "/productos/" + producto.id, {}).subscribe(
      (res: Response) => {
        producto.textoAuxiliar = "Añadido al carrito"
      },
      (err) => {
        console.log(err)
      }
    )
  }

}
