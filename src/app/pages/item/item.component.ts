import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
	
	fecha = new Date();
	producto: ProductoDescripcion;
	id: string;
	//ActivatedRoute sirve para obtener parametros que se envian por url
  constructor( private route: ActivatedRoute, 
  			   public productoService: ProductosService) { }

  ngOnInit() {
  	this.route.params.subscribe( parametros => {
  		//console.log( parametros['id'] );

  		this.productoService.getProducto(parametros ['id'])
  		.subscribe( (producto: ProductoDescripcion) =>{
  			//console.log(producto);
  			this.producto = producto;
  			this.id = parametros['id'];
  		})

  	})
  }

}
