import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaComponent } from './noticia/noticia.component';



@NgModule({
  declarations: [NoticiasComponent, NoticiaComponent],
  exports: [
    NoticiasComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
