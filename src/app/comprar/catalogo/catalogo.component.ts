import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CestaService } from 'src/app/cesta.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  constructor(public _cestaService: CestaService) {}

  productos$!: Observable<any>;
  prodCat: any;

  ngOnInit(): void {
    this.productos$ = this._cestaService.productos;
  }
  categorias = this._cestaService.getCategorias();
  productos = this._cestaService.getProductos();

  getProductosCat = (cat: any) => {
    //filtramos solo los productos que pretenezcan a la categoria que vamos a pintar
    this.productos$.pipe().subscribe((res: any) => (this.prodCat = res));
    var productosCat = this.prodCat.filter(
      (articulo: any) => articulo.categoria === cat.idCategoria
    );
    console.log(productosCat);
    return productosCat;
  };
}
