import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

var cesta: any[] = [];
//id, imagen, nombre, precii, cantidad

@Injectable({
  providedIn: 'root',
})
export class CestaService {
  constructor() {}

  private productosCat = new BehaviorSubject<any>(this.getProductos());
  private productoscesta = new BehaviorSubject<any>(this.getProductosCesta());

  getProductosCesta() {
    var currentCesta;
    var sesionCesta = localStorage.getItem('cesta');
    if (sesionCesta === null) {
      //si no hay productos especificas de esta sesion
      currentCesta = cesta; //usamos los productos por defecto -> cesta vacia
    } else {
      currentCesta = JSON.parse(sesionCesta);
    }
    return currentCesta;
  }

  updateStock(producto: any) {
    var currentProds;
    var sesionProds = localStorage.getItem('productos');
    if (sesionProds !== null) {
      currentProds = JSON.parse(sesionProds);
      //disminuimos el stock de la tarjeta
      currentProds.forEach((prod: any) => {
        if (prod.id === producto.id) {
          prod.stock -= 1;
        }
      });
    }

    localStorage.setItem('productos', JSON.stringify(currentProds));
    this.productosCat.next(currentProds);
  }

  updateStockBorrar(producto: any) {
    var currentProds;
    var sesionProds = localStorage.getItem('productos');
    if (sesionProds !== null) {
      currentProds = JSON.parse(sesionProds);
      //disminuimos el stock de la tarjeta
      currentProds.forEach((prod: any) => {
        if (prod.id === producto.id) {
          prod.stock += 1;
        }
      });
    }

    localStorage.setItem('productos', JSON.stringify(currentProds));
    this.productosCat.next(currentProds);
  }

  addProductoCesta(producto: any) {
    var currentCesta;
    var sesionCesta = localStorage.getItem('cesta');
    if (sesionCesta === null) {
      currentCesta = cesta;
    } else {
      currentCesta = JSON.parse(sesionCesta);
    }
    //busca si el articulo a añadir ya esta en la cesta
    var productCesta = currentCesta.filter(
      (articulo: any) => articulo.id === producto.id
    );

    if (productCesta.length > 0) {
      //si el articulo ya esta en la cesta
      currentCesta.forEach((prod: any) => {
        if (prod.id === productCesta[0].id) {
          var newPro = {
            id: producto.id,
            imagen: producto.imagen,
            nombre: producto.nombre,
            precio: parseFloat(producto.precio),
            cantidad: (productCesta[0].cantidad += 1),
          };
        }
      });
    } else {
      // si el articulo no esta todavia en la cesta
      //añadimos el articulo
      var newPro = {
        id: producto.id,
        imagen: producto.imagen,
        nombre: producto.nombre,
        precio: parseFloat(producto.precio),
        cantidad: 1,
      };
      currentCesta.push(newPro);
    }
    localStorage.setItem('cesta', JSON.stringify(currentCesta));
    this.updateStock(producto);
    this.productoscesta.next(currentCesta);
  }

  deleteProductoCesta(producto: any) {
    console.log('borramos producto a cesta click');
    console.log(producto);

    var currentCesta: any;
    var sesionCesta = localStorage.getItem('cesta');
    if (sesionCesta === null) {
      currentCesta = cesta;
    } else {
      currentCesta = JSON.parse(sesionCesta);
    }
    //busca si el articulo a añadir ya esta en la cesta
    var productCesta = currentCesta.filter(
      (articulo: any) => articulo.id === producto.id
    );

    if (productCesta[0].cantidad === 1) {
      //si el articulo solo esta en la cesta una vez
      currentCesta.forEach((prod: any) => {
        if (prod.id === productCesta[0].id) {
          //borra el producto de la cesta
          currentCesta.splice(currentCesta.indexOf(prod), 1);
        }
      });
    } else {
      // si el articulo esta mas de una vez
      //disminuimos cantidad
      currentCesta.forEach((prod: any) => {
        if (prod.id === productCesta[0].id) {
          prod.cantidad -= 1;
        }
      });
    }

    console.log('current cesta: ' + currentCesta);
    localStorage.setItem('cesta', JSON.stringify(currentCesta));
    this.updateStockBorrar(producto);
    this.productoscesta.next(currentCesta);
  }
  iniProds() {
    localStorage.setItem('productos', JSON.stringify(productos));
  }

  getCategorias() {
    var currentCat;
    var sesionCat = localStorage.getItem('categorias');
    if (sesionCat === null) {
      //si no hay categorias especificas de esta sesion
      currentCat = categorias; //usamos las categorias por defecto
    } else {
      currentCat = JSON.parse(sesionCat);
    }
    return currentCat;
  }

  getProductos() {
    var currentProds;
    var sesionProds = localStorage.getItem('productos');
    if (sesionProds === null) {
      //si no hay productos especificas de esta sesion
      this.iniProds();
      currentProds = productos; //usamos los productos por defecto
    } else {
      currentProds = JSON.parse(sesionProds);
    }
    return currentProds;
  }

  addCategoria(nombreCat: string) {
    var currentCat;
    var sesionCat = localStorage.getItem('categorias');
    if (sesionCat === null) {
      //si no hay categorias especificas de esta sesion
      currentCat = categorias; //usamos las categorias por defecto
    } else {
      currentCat = JSON.parse(sesionCat);
    }
    const newCategoria = {
      idCategoria: currentCat.length + 1,
      nombre: nombreCat,
    };
    currentCat.push(newCategoria);
    localStorage.setItem('categorias', JSON.stringify(currentCat));
  }

  addProducto(producto: any) {
    //imagen
    const pathimagen = producto.imagen;
    var arrayDeCadenas = pathimagen.split('\\');
    producto.imagen = './assets/img/' + arrayDeCadenas[2];
    var currentProds;
    var sesionProds = localStorage.getItem('productos');
    if (sesionProds === null) {
      //si no hay categorias especificas de esta sesion
      currentProds = productos; //usamos las categorias por defecto
    } else {
      currentProds = JSON.parse(sesionProds);

      console.log(currentProds);
    }
    producto.id = currentProds.length + 1;
    producto.categoria = parseInt(producto.categoria);
    producto.precio = parseFloat(producto.precio);
    producto.stock = parseFloat(producto.stock);
    currentProds.push(producto);

    console.log(currentProds);
    localStorage.setItem('productos', JSON.stringify(currentProds));
  }

  get productos() {
    return this.productosCat.asObservable();
  }

  get productosCesta() {
    return this.productoscesta.asObservable();
  }
}

var categorias = [
  {
    idCategoria: 1,
    nombre: 'Camisetas',
  },
  {
    idCategoria: 2,
    nombre: 'Botas',
  },
  {
    idCategoria: 3,
    nombre: 'Guantes',
  },
];

var productos = [
  {
    id: 1,
    categoria: 1,
    imagen: './assets/img/camiseta1.jpeg',
    nombre: '1º Equipación Real Madrid 21/22',
    precio: 98.75,
    stock: 2,
  },
  {
    id: 2,
    categoria: 1,
    imagen: './assets/img/camiseta2.jpeg',
    nombre: '1º Equipación FC Barcelona 21/22',
    precio: 89.99,
    stock: 3,
  },
  {
    id: 3,
    categoria: 1,
    imagen: './assets/img/camiseta3.jpeg',
    nombre: '2º Equipación Chelsea FC 21/22',
    precio: 70.99,
    stock: 1,
  },
  {
    id: 4,
    categoria: 1,
    imagen: './assets/img/camiseta4.jpeg',
    nombre: '1º Equipación Juventus 21/22',
    precio: 95.5,
    stock: 3,
  },
  {
    id: 5,
    categoria: 1,
    imagen: './assets/img/camiseta5.jpeg',
    nombre: '1º Equipación Atlético de Madrid 21/22',
    precio: 75.63,
    stock: 3,
  },
  {
    id: 6,
    categoria: 1,
    imagen: './assets/img/camiseta6.jpeg',
    nombre: '1º Equipación Paris Saint-Germain 21/22',
    precio: 82.56,
    stock: 0,
  },
  {
    id: 7,
    categoria: 2,
    imagen: './assets/img/botas1.png',
    nombre: 'Adidas X Speedflow +',
    precio: 205.99,
    stock: 5,
  },
  {
    id: 8,
    categoria: 2,
    imagen: './assets/img/botas2.png',
    nombre: 'Adidas Predator Freak +',
    precio: 279.99,
    stock: 3,
  },
  {
    id: 9,
    categoria: 2,
    imagen: './assets/img/botas3.png',
    nombre: 'Nike Phantom GT2',
    precio: 250.99,
    stock: 1,
  },
  {
    id: 10,
    categoria: 2,
    imagen: './assets/img/botas4.png',
    nombre: 'Nike Mercurial Vapor 14 ',
    precio: 295.5,
    stock: 3,
  },
  {
    id: 11,
    categoria: 2,
    imagen: './assets/img/botas5.png',
    nombre: 'Nike Tiempo Legend 9',
    precio: 229.99,
    stock: 3,
  },
  {
    id: 12,
    categoria: 2,
    imagen: './assets/img/botas6.png',
    nombre: 'Puma Ultra 1.3',
    precio: 219.99,
    stock: 3,
  },
  {
    id: 13,
    categoria: 3,
    imagen: './assets/img/guantes1.jpeg',
    nombre: 'Adidas Predator Pro Fingersave',
    precio: 119.99,
    stock: 2,
  },
  {
    id: 14,
    categoria: 3,
    imagen: './assets/img/guantes2.jpeg',
    nombre: 'Nike Mercurial Touch Elite Promo',
    precio: 149.99,
    stock: 2,
  },
  {
    id: 15,
    categoria: 3,
    imagen: './assets/img/guantes3.jpeg',
    nombre: 'Earhart 3 Pro Misa Rodriguez',
    precio: 59.99,
    stock: 4,
  },
  {
    id: 16,
    categoria: 3,
    imagen: './assets/img/guantes4.jpeg',
    nombre: 'Nike Mercurial Vapor Grip 3 Blue Print',
    precio: 45.99,
    stock: 0,
  },
  {
    id: 17,
    categoria: 3,
    imagen: './assets/img/guantes5.jpeg',
    nombre: 'UHLSports Pure Alliance Supergrip+',
    precio: 129.99,
    stock: 9,
  },
  {
    id: 18,
    categoria: 3,
    imagen: './assets/img/guantes6.jpeg',
    nombre: 'SP Pantera Phobos Protect Elite',
    precio: 59.99,
    stock: 3,
  },
];
/*localStorage.removeItem('productos');
localStorage.removeItem('categorias');
localStorage.removeItem('cesta'); */
