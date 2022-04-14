import { Component, OnInit } from '@angular/core';
import { AddService } from 'src/app/add.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  constructor(public _addService: AddService) {}

  categorias = this._addService.getCategorias();
  productos = this._addService.getProductos();
  ngOnInit(): void {}

  getProductosCat = (cat: any) => {
    var productosCat = this.productos.filter(
      //filtramos solo los productos que pretenezcan a la categoria que vamos a pintar
      (articulo: any) => articulo.categoria === cat.idCategoria
    );
    return productosCat;
  };
}
