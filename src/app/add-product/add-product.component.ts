import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  constructor() {}
  nombre: string = '';
  imagen: string = '';
  precio: number = 0;
  stock: number = 0;
  categoria: string = '';

  ngOnInit(): void {}
}
