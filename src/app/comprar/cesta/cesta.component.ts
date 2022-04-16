import { Component, OnInit } from '@angular/core';
import { CestaService } from 'src/app/cesta.service';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css'],
})
export class CestaComponent implements OnInit {
  constructor(public _cestaService: CestaService) {}
  cesta: any = this._cestaService.getProductosCesta();

  ngOnInit(): void {}

  resetCesta() {
    localStorage.setItem('cesta', JSON.stringify([]));
  }

  getPrecioTotal() {
    var precioTotal = 0;
    this.cesta.forEach(function (producto: any) {
      precioTotal += producto.precio * producto.cantidad;
    });
    return precioTotal;
  }

  getNumArticulos() {
    var numArticulosCesta = 0;
    this.cesta.forEach(function (producto: any) {
      numArticulosCesta += producto.cantidad;
    });
    return numArticulosCesta;
  }
}
