import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders}  from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {ProductoComponent} from "./producto/producto.component";
import {CategoriaComponent} from "./categoria/categoria.component";
import {UsuarioComponent} from "./usuario/usuario.component";
import {CarritoComponent} from "./carrito/carrito.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'categoria', component: CategoriaComponent},
  {path: 'categorias/:idCategoria/producto', component: ProductoComponent},
  {path: 'producto', component: ProductoComponent},
  {path: 'login', component: UsuarioComponent},
  {path: 'carrito', component: CarritoComponent},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
