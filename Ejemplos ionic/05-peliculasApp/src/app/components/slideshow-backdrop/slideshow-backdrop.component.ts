import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() abrirDetalle = new EventEmitter();

  slideOpts = {
    slidesPerView: 1.3,
    freeMode: true
  };

  constructor() { }

  ngOnInit() { }

  onCardClick(id: string) {
    this.abrirDetalle.emit({ id });
  }

}
