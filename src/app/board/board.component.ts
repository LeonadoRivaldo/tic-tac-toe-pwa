import { Component, OnInit } from '@angular/core';
import { filter } from 'minimatch';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  squares: any[];
  xIsNext: boolean;
  winner: string;
  winnings = {
    X: 0,
    O: 0
  };

  constructor() { }

  ngOnInit() {
    this.newGame();
  }


  newGame(): void {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }


  get player(): string {
    return this.xIsNext ? 'X' : 'O';
  }

  tooglePlayer(): void {
    this.xIsNext = !this.xIsNext;
  }

  makeMove(idx: number): void {
    if ( !this.squares[idx] ) {
      this.squares.splice(idx, 1, this.player);
      this.tooglePlayer();
    }

    this.winner = this.calculateWinner();
    //this.autoReset();
  }

  autoReset(): void {
    const isDone = this.squares.filter(v => !v ).length === 0;

    if ( isDone || this.winner ) {
      this.newGame();
    }

  }

  calculateWinner(): string {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    const winner = lines.map((line) => {
      const [ a, b, c ] = line;
      const aEqualB = this.squares[a] === this.squares[b];
      const aEqualc = this.squares[a] === this.squares[c];
      if ( this.squares[a] && aEqualB && aEqualc ) {
        return this.squares[a];
      }
    }).filter(player => !!player)[0];

    if ( !winner ) {
      return null;
    }

    this.winnings[winner] = this.winnings[winner] + 1;

    return winner;

  }

}
