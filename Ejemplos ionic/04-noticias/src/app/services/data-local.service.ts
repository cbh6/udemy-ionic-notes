import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  favoritos: Article[] = [];

  constructor(private storage: Storage, public toastController: ToastController) {
    this.cargarFavoritos();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color: 'primary',
      animated: true,
      cssClass: 'toast-noticias'
    });
    toast.present();
  }

  guardarFavorito(noticia: Article) {
    const existe = this.favoritos.find(n => n.title === noticia.title);

    if (!existe) {
      this.favoritos.unshift(noticia);
      this.storage.set('favoritos', this.favoritos);
      this.presentToast('Guardado en favoritos');
    }
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');

    if (favoritos) {
      this.favoritos = favoritos;
    }
  }

  borrarFavorito(noticia: Article) {
    this.favoritos = this.favoritos.filter(n => n.title !== noticia.title);
    this.storage.set('favoritos', this.favoritos);
    this.presentToast('Borrado de favoritos');
  }
}
