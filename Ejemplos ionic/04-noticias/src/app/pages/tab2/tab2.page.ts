import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, IonInfiniteScroll } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  @ViewChild(IonSegment, { static: true }) segment: IonSegment;
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) { }

  ngOnInit() {
    this.segment.value = 'business';
    this.cargarNoticias(this.segment.value);
  }

  cambioCategoria(event) {
    this.noticias = [];
    this.cargarNoticias(event.detail.value);
    this.infiniteScroll.disabled = false;
  }

  cargarNoticias(categoria: string, event?) {
    console.log(categoria);
    this.noticiasService.getTopHeadlinesCategoria(categoria).subscribe(res => {
      console.log(res);

      if (!res.articles.length) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.noticias.push(...res.articles);

      if (event) {
        event.target.complete();
      }
    });
  }

  loadData(event) {
    this.cargarNoticias(this.segment.value, event);
  }

}
