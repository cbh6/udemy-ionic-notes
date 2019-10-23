import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
})
export class SegmentPage implements OnInit {

  @ViewChild(IonSegment, null) segment: IonSegment;

  superHeroes: Observable<any>;

  selectedSegment = '';

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.segment.value = 'todos';
    this.superHeroes = this.dataService.getHeroes();
  }

  segmentChanged(event) {
    const valorSegmento = event.detail.value;
    console.log(valorSegmento);

    if (valorSegmento === 'todos') {
      this.selectedSegment = '';
      return;
    }
    this.selectedSegment = valorSegmento;
  }

}
