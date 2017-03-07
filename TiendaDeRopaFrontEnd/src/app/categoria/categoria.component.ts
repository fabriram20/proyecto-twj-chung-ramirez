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

  crearCategoria(formulario: NgForm){

    console.log(this.nuevaCategoria);

    this._http.post(this._masterURL.url+'Categoria', this.nuevaCategoria).subscribe(
      (res:Response)=>{
        this.categorias.push(res.json());
        this.nuevaCategoria={};
        // this.disabledButtons.NuevatiendaFormSubmitButton = false;
      },
      (err)=>{
        console.log(err)
        // this.disabledButtons.NuevatiendaFormSubmitButton = false;
      }
    )
  }

  borrarProducto(id:number) {
    this._http.delete(this._masterURL.url + "Categoria/" + id).subscribe(
      (res) => {
        let categoriaBorrada=res.json();
        this.categorias = this.categorias.filter(value=>categoriaBorrada.id!=value.id)
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
