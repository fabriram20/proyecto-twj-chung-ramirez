import {Component} from '@angular/core';
import {Http, Response} from "@angular/http";
import {MasterUrlService} from "./services/master-url.service";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  categorias = [];

  constructor(private _http: Http, private _masterURL: MasterUrlService, private _userLogged: UserService) {
  }

  ngOnInit() {
    this._http.get(this._masterURL.url + "Categoria")
      .subscribe(
        (res) => {
          console.log(res.json());
          this.categorias = res.json();
          console.log(this._userLogged.idUsuario);
        },
        (err) => {
          console.log(err);
        }
      )
  }
}
