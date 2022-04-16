import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CestaService } from '../cesta.service';

@Component({
  selector: 'app-addCategory',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  nombre: string = '';
  constructor(public _addService: CestaService, public router: Router) {}

  addCategory() {
    console.log('categoria añadida: ' + this.nombre);
    this._addService.addCategoria(this.nombre);
    this.router.navigate(['/']);
  }
}
