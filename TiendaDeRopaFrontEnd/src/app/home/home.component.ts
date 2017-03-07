import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _parametros:any;
  productos = [];
  categorias = [];


  constructor(private _activatedRoute: ActivatedRoute, private _http: Http, private _masterURL: MasterUrlService) {
  }

  ngOnInit() {
    this._activatedRoute
      .params
      .subscribe(parametros => {
        this._parametros = parametros;

        // Peticion de productos
        this._http.get(this._masterURL.url + "Producto").subscribe(
          (res: Response) => {
            this.productos = res.json().map((value) => {
              value.formularioCerrado = true;
              return value;
            });
            ;
          },
          (err) => {
            console.log(err);
          }
        )
        // Peticion de categorias
        this._http.get(this._masterURL.url + "Categoria").subscribe(
          (res: Response) => {
            this.categorias = res.json()
              .map((value) => {
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
}
