import { Component, Input, OnInit } from '@angular/core';
import { CestaService } from 'src/app/cesta.service';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css'],
})
export class TarjetaComponent implements OnInit {
  constructor(public _cestaService: CestaService) {}

  @Input() prod: any;
  ngOnInit(): void {}

  isAvailable() {
    return this.prod.stock <= 0;
  }

  addCesta(producto: any) {
    console.log('producto: ' + producto.nombre);
    this._cestaService.addProductoCesta(producto);
  }
}
