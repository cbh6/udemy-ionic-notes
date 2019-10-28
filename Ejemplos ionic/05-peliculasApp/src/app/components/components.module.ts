import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowBackdropComponent } from './slideshow-backdrop/slideshow-backdrop.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { SlideshowPosterComponent } from './slideshow-poster/slideshow-poster.component';
import { SlideshowParesComponent } from './slideshow-pares/slideshow-pares.component';
import { DetalleComponent } from './detalle/detalle.component';

@NgModule({
  entryComponents: [DetalleComponent],
  declarations: [SlideshowBackdropComponent, SlideshowPosterComponent, SlideshowParesComponent, DetalleComponent],
  exports: [SlideshowBackdropComponent, SlideshowPosterComponent, SlideshowParesComponent, DetalleComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule
  ]
})
export class ComponentsModule { }
