import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'top',
      color: 'primary'
    });
    toast.present();
  }

  guardarPelicula(pelicula: PeliculaDetalle) {
    const existe = !!this.peliculas.find(p => p.id === pelicula.id);
    let msg = '';

    if (existe) {
      this.peliculas = this.peliculas.filter(p => p.id !== pelicula.id);
      msg = 'Eliminado de favoritos';
    } else {
      this.peliculas.push(pelicula);
      msg = 'Añadido a favoritos';
    }

    this.presentToast(msg);
    this.storage.set('peliculas', this.peliculas);

    return !existe;
  }

  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id) {
    await this.cargarFavoritos();
    const existe = this.peliculas.find(p => p.id === id);
    return !!existe;
  }
}
