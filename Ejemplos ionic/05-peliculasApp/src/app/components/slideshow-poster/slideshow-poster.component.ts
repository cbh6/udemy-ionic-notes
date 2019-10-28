import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Pelicula } from '../../interfaces/interfaces';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input() peliculas: Pelicula[] = [];
  @Output() abrirDetalle = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true
  };

  constructor() { }

  ngOnInit() { }

  onCardClick(id: string) {
    this.abrirDetalle.emit({ id });
  }

}
