import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {UsuarioComponent} from './usuario/usuario.component';
import {CarritoComponent} from './carrito/carrito.component';
import {MasterUrlService} from "./services/master-url.service";
import {routing} from "./app.routes";
import {UserService} from "./services/user.service";
import {HomeComponent} from "./home/home.component";
import {ProductoComponent} from "./producto/producto.component";
import {CategoriaComponent} from "./categoria/categoria.component";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductoComponent,
    CategoriaComponent,
    UsuarioComponent,
    CarritoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    MasterUrlService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
