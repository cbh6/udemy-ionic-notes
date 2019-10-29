import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  guardados: Registro[] = [];

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private iab: InAppBrowser,
    private file: File,
    private emailComposer: EmailComposer
  ) {
    this.cargarRegistros();
  }

  async guardarRegistro(format: string, text: string) {
    await this.cargarRegistros();

    const nuevoRegistro = new Registro(format, text);
    this.guardados.unshift(nuevoRegistro);
    console.log(this.guardados);

    this.storage.set('registros', this.guardados);

    this.abrirRegistro(nuevoRegistro);
  }

  async cargarRegistros() {
    const registrosGuardados = await this.storage.get('registros');
    this.guardados = registrosGuardados || [];
  }

  abrirRegistro(registro: Registro) {
    this.navCtrl.navigateForward('/tabs/tab2');
    switch (registro.type) {
      case 'http':
        this.iab.create(registro.text, '_system');
        break;
      case 'geo':
        this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.text}`);
        break;
    }
  }

  enviarCorreo() {
    const titulos = 'Tipo, Formato, Creado en, Texto\n';
    const data = [titulos, ...this.guardados.map(r => `${r.type}, ${r.format}, ${r.created}, ${r.text.replace(',', ' ')}\n`)];
    console.log(data.join(''));
    this.crearArchivoFisico(data.join(''));
  }

  crearArchivoFisico(text: string) {
    this.file.checkFile(this.file.dataDirectory, 'registros.csv')
      // Existe -> va por el then
      // Escribimos sobre el que ya hay
      .then(existe => {
        console.log('Existe?', existe);
        return this.escribirEnArchivo(text);
      })
      // Si no existe, va por el catch
      // Creamos el archivo y escribimos sobre él
      .catch(err => {
        console.log('Error');
        return this.file.createFile(this.file.dataDirectory, 'registros.csv', false)
          .then(creado => this.escribirEnArchivo(text))
          .catch(err2 => console.log('No se pudo crear el archivo'));
      });
  }

  async escribirEnArchivo(text: string) {
    await this.file.writeExistingFile(this.file.dataDirectory, 'registros.csv', text);
    console.log(this.file.dataDirectory + '/registros.csv');

    const email = {
      to: 'cbotella@devcenter.es',
      attachments: [
        `${this.file.dataDirectory}registros.csv`,
      ],
      subject: 'Backup de scans',
      body: 'Aquí está tu backup de escaneos - <strong>ScanApp</strong>',
      isHtml: true
    };

    // Send a text message using default options
    this.emailComposer.open(email);
  }
}
