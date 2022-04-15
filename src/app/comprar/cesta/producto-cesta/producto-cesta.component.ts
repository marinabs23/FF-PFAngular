import { Component, OnInit } from '@angular/core';

import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-producto-cesta',
  templateUrl: './producto-cesta.component.html',
  styleUrls: ['./producto-cesta.component.css'],
})
export class ProductoCestaComponent implements OnInit {
  constructor() {}
  faTrash = faTrash;
  ngOnInit(): void {}
}
