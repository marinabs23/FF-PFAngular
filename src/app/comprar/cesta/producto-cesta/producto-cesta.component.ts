import { Component, Input, OnInit } from '@angular/core';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CestaService } from 'src/app/cesta.service';

@Component({
  selector: 'app-producto-cesta',
  templateUrl: './producto-cesta.component.html',
  styleUrls: ['./producto-cesta.component.css'],
})
export class ProductoCestaComponent implements OnInit {
  constructor(public _cestaService: CestaService) {}
  faTrash = faTrash;
  @Input() prod: any;
  ngOnInit(): void {}

  deleteCesta() {
    this._cestaService.deleteProductoCesta(this.prod);
  }
}
