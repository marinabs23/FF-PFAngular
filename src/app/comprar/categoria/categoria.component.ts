import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css'],
})
export class CategoriaComponent implements OnInit {
  constructor() {}

  @Input() cat: any;
  @Input() productos: any;

  visible = true;

  toggleDisplay() {
    this.visible = !this.visible;
  }

  ngOnInit(): void {}
}
