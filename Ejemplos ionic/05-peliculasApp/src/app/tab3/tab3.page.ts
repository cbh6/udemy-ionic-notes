import { Component, } from '@angular/core';
import { PeliculaDetalle, Genre } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  favoritosPorGenero: any[] = [];

  constructor(private dataLocaL: DataLocalService, private moviesService: MoviesService, private modalCtrl: ModalController) { }

  ionViewWillEnter() {
    this.loadData();
  }

  async loadData() {
    this.peliculas = await this.dataLocaL.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();

    this.pelisPorGenero(this.generos, this.peliculas);
  }

  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {
    this.favoritosPorGenero = generos.reduce((prev, next) => {
      const peliculasFiltradas = peliculas.filter(p => p.genres.some(g => g.id === next.id));
      prev.push({
        titulo: next.name,
        pelis: peliculasFiltradas
      });
      return prev;
    }, []);
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
