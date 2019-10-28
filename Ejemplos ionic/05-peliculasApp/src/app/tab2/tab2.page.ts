import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../interfaces/interfaces';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  ideas: string[] = ['Spiderman', 'Avenger', 'El señor de los anillos', 'La vida es bella'];
  peliculas: Pelicula[] = [];
  buscando = false;

  constructor(private moviesService: MoviesService, private modalCtrl: ModalController) { }

  buscar(event) {
    const valor: string = event.detail.value;

    this.buscando = true;

    if (!valor) {
      this.peliculas = [];
      this.buscando = false;
      return;
    }

    this.moviesService.buscarPeliculas(valor).subscribe(res => {
      console.log(res);
      this.peliculas = res['results'];
      this.buscando = false;
    });
  }

  onClickIdea(idea: string) {
    this.textoBuscar = idea;
  }

  async mostrarDetalle(id: string) {
    console.log('mostrarDetalle', id);
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });

    modal.present();
  }

}
