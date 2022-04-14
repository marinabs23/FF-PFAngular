import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CestaComponent } from './comprar/cesta/cesta.component';
import { ComprarComponent } from './comprar/comprar.component';
import { CatalogoComponent } from './comprar/catalogo/catalogo.component';
import { TarjetaComponent } from './comprar/tarjeta/tarjeta.component';
import { CategoriaComponent } from './comprar/categoria/categoria.component';
import { AddCategoryComponent } from './add-category/add-category.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AddProductComponent,
    AddCategoryComponent,
    ComprarComponent,
    CestaComponent,
    CatalogoComponent,
    TarjetaComponent,
    CategoriaComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
