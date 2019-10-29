import { Component } from '@angular/core';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public dataLocal: DataLocalService) { }

  enviarCorreo() {
    console.log('Enviando correo...');
    this.dataLocal.enviarCorreo();
  }

  abrirRegistro(registro) {
    console.log('Registro', registro);
    this.dataLocal.abrirRegistro(registro);
  }

}
