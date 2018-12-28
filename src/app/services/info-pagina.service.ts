	import { Injectable } from '@angular/core';
	import { HttpClient } from '@angular/common/http';
	import { InfoPagina } from '../interfaces/info-pagina.interface';

	@Injectable({
	  providedIn: 'root'
	})
	export class InfoPaginaService {

		info_deCualquierTipo: any = {};
		info_estructurada: InfoPagina = {};
		cargada = false;

		equipo: any[] = [];

	  	constructor( private http: HttpClient) {
	  		this.cargarInfo();
	  		this.cargarEquipo();
	  	}

	  	private cargarInfo(){
		  	console.log('Servicio infoPagina cargado');

		  	//Leer el archivo JSON
		  	this.http.get('assets/data/data-pagina.json').subscribe( resp =>{
		  		this.cargada = true;
		  		this.info_deCualquierTipo = resp;
		  		//console.log(resp);
		  		//console.log(resp['email']);
		  	});

		  	//Leer el archivo JSON usando interfaces
		  	this.http.get('assets/data/data-pagina.json').subscribe( (resp: InfoPagina) =>{
		  		this.cargada = true;
		  		this.info_estructurada = resp;
		  		//console.log(resp.nombre_corto);
		  		//console.log(resp);
		  		//console.log(resp['email']);
		  	});		  	
	  	}

	  	private cargarEquipo(){
	  		this.http.get('https://angular-html-3b407.firebaseio.com/equipo.json').subscribe( (resp: any[]) =>{
	  			this.equipo = resp;
	  			console.log(this.equipo);
	  			});
	  		}
		}
	
