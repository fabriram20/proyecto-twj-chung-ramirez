import {Component} from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "./services/master-url.service";
import {UserService} from "./services/user.service";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  categorias = [];
  buscarProducto = {};

  constructor(private _http: Http, private _masterURL: MasterUrlService, private _userLogged: UserService, private _router: Router) {
  }

  ngOnInit() {
    this._http.get(this._masterURL.url + "Categoria")
      .subscribe(
        (res) => {
          console.log(res.json());
          this.categorias = res.json();
          console.log(this._userLogged.idUsuario);
          console.log(this._userLogged.idCarrito);
        },
        (err) => {
          console.log(err);
        }
      )
  }

  buscarProductos(formulario: NgForm) {
    this._router.navigate(['/productos', formulario.value.nombreProducto]);
    this.buscarProducto = {};
  }
}
