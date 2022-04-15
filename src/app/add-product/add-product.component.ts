import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddService } from '../add.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor(public _addService: AddService, public router: Router) {}

  categorias = this._addService.getCategorias();

  nombre: string = '';
  imagen: string = '';
  precio: number = 0;
  stock: number = 0;
  categoria: string = '';

  ngOnInit(): void {}

  addProduct() {
    var producto = {
      categoria: this.categoria,
      imagen: this.imagen,
      nombre: this.nombre,
      precio: this.precio,
      stock: this.stock,
    };
    console.log('producto añadida: ' + this.nombre);
    this._addService.addProducto(producto);
    this.router.navigate(['/']);
  }
}
