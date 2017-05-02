import { Component, OnInit } from '@angular/core';
import {GameService} from '../game.service';
import {Cell} from './cell.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  cells: Cell[] = [];

  constructor(private gameService: GameService) {
    this.cells = this.gameService.cells;
  }

  ngOnInit() {

  }

  onBoardCellClick(cell: Cell) {
    if (this.gameService.whoseTurn === 'player' &&
        this.gameService.gameState === 'active' &&
        cell.setValue('x')) {

      console.log('boardValueChange2');
      this.gameService.boardValueChange.next('play');
    }
  }
}
