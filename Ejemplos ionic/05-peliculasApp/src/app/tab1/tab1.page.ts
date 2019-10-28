import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];

  constructor(private moviesService: MoviesService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.moviesService.getFeature().subscribe(res => this.peliculasRecientes = res.results);
    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesService.getPopulares().subscribe(res => {
      const arrTemp = [...this.populares, ...res.results];
      this.populares = arrTemp;
    });
  }

  async mostrarDetalle(event) {
    console.log('mostrarDetalle', event.id);
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id: event.id
      }
    });

    modal.present();
  }

}
