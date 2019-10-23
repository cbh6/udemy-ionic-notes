import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.page.scss'],
})
export class InputPage implements OnInit {

  name: string;

  usuario = {
    email: '',
    password: '',
  }

  constructor() { }

  ngOnInit() {
  }

  onSubmitTemplate() {
    console.log('submit!');
    console.log(this.usuario);
  }

}
