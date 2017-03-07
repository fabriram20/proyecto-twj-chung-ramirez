import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  private _parametros:any;
  nuevaCategoria={};
  categorias=[];
  // disabledButtons = {
  //   NuevatiendaFormSubmitButton: false
  // }
  constructor(private _activatedRoute: ActivatedRoute, private _http:Http, private _masterURL:MasterUrlService) {}

  ngOnInit() {
    this._activatedRoute
      .params
      .subscribe(parametros=>{
        this._parametros = parametros;

        // Peticion de categorias
        this._http.get(this._masterURL.url + "Categoria").subscribe(
          (res: Response) => {
            this.categorias = res.json()
              .map((value)=>{
                value.idformularioCerrado = true;
                return value;
              });
          },
          (err) => {
            console.log(err);
          }
        )
      })
  }

  crearProducto(formulario: NgForm){
    let categoria = {
      nombre:formulario.value.nombre
    }
    this._http.post(this._masterURL.url+'Categoria', categoria).subscribe(
      (res:Response)=>{
        this.productos.push(res.json());
        this.nuevoProducto={};
        // this.disabledButtons.NuevatiendaFormSubmitButton = false;
      },
      (err)=>{
        console.log(err)
        // this.disabledButtons.NuevatiendaFormSubmitButton = false;
      }
    )
  }

  borrarProducto(id:number) {
    this._http.delete(this._masterURL.url + "Producto/" + id).subscribe(
      (res) => {
        let productoBorrado=res.json();
        this.productos = this.productos.filter(value=>productoBorrado.id!=value.id)
      },
      (err) => {
        console.log(err);
      }
    )
  }


  actualizarUsuario(producto:any){
    let parametros={
      nombreProducto:producto.value.nombreProducto,
      foto:producto.value.foto,
      precio:producto.value.precio,
      idcategoria:producto.value.idcategoria
    };
    this._http.put(this._masterURL.url+"Producto/"+producto.id,parametros).subscribe(
      (res:Response)=>{
        producto.formularioCerrado = !producto.formularioCerrado;
        console.log("Respuesta: ",res.json());
      },
      (err)=>{
        console.log("Error: ",err)
      }
    )
  }

}
