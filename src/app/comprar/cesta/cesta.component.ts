import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CestaService } from 'src/app/cesta.service';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.css'],
})
export class CestaComponent implements OnInit {
  constructor(public _cestaService: CestaService) {}

  cesta$!: Observable<any>;
  artCesta: any;

  ngOnInit(): void {
    this.cesta$ = this._cestaService.productosCesta;
    this.cesta$.pipe().subscribe((res: any) => (this.artCesta = res));
  }

  resetCesta() {
    localStorage.setItem('cesta', JSON.stringify([]));
  }

  getPrecioTotal() {
    var precioTotal = 0;
    this.artCesta.forEach(function (producto: any) {
      console.log('p: ' + producto);
      precioTotal += producto.precio * producto.cantidad;
    });
    console.log('precio total: ' + precioTotal);
    return precioTotal;
  }

  getNumArticulos() {
    var numArticulosCesta = 0;
    this.artCesta.forEach(function (producto: any) {
      numArticulosCesta += producto.cantidad;
    });
    return numArticulosCesta;
  }
}
