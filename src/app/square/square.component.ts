import { Component, Input } from '@angular/core';
import { tictac } from '../tic-tac.model';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: [ 'square.component.scss' ]
})
export class SquareComponent {
  @Input() value: tictac;


  get status() {
    return this.value === 'X' ? 'success' : 'info';
  }


}
