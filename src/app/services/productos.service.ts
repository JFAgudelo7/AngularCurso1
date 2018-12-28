import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

	cargando = true;
	productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {
  	this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise( (resolve, reject) => {
      this.http.get('https://angular-html-3b407.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) =>{   
        console.log(resp);     
        this.productos = resp;
        /*setTimeout(() => {
          this.cargando = false;
        },2000); */  
        this.cargando = false;
        resolve();
      });
    });

  	
  }

  getProducto(id: string){
    // El caracter ` sirve para hacer inserciones en string dentro de direcciones. Parametros javascript.
    return this.http.get(`https://angular-html-3b407.firebaseio.com/productos/${ id }.json`);    
  }

  buscarProducto( termino: string){

    //Logica de filtrado para controlar que se carguen primero los productos y despues se haga el filtrado, evitando filtrar el arreglo de productos vacio.
    if ( this.productos.length == 0){
      //Cargar productos
      this.cargarProductos().then( () => {
        //Despues de tener los productos
        //Aplicar filtro
        this.filtrarProductos(termino);
      })
    }
    else{
      //aplicar filtro
       this.filtrarProductos(termino);
    }

    this.productosFiltrado = this.productos.filter( producto =>{
      return true;
    });

   
  }

  private filtrarProductos( termino: string ){

    termino = termino.toLocaleLowerCase();

    console.log(this.productos);
    this.productosFiltrado = [];
    this.productos.forEach( prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if( prod.categoria.indexOf(termino) >= 0 || prod.titulo.indexOf(termino) >= 0){
        this.productosFiltrado.push( prod );
      }
    })
  }
}
