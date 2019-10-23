import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  @ViewChild('lista', null) lista: IonList;
  users: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.users = this.dataService.getUsers();
  }

  favorite(user) {
    console.log('favorite', user);
    this.lista.closeSlidingItems();
  }
  share(user) {
    console.log('share', user);
    this.lista.closeSlidingItems();
  }
  borrar(user) {
    console.log('borrar', user);
    this.lista.closeSlidingItems();
  }

}
