import {Subject} from 'rxjs/Subject';
import {Cell} from './board/cell.model';
import {forEach} from '@angular/router/src/utils/collection';

export class GameService {
  static player = 'x';
  static cpu = 'o';

  // To emit and receive board event, holds a command var
  boardValueChange = new Subject<string> ();

  // fires when game is over, holds the winner
  gameOverAlert = new Subject<string> ();

  // who is playing
  whoseTurn = 'player'; // or cpu

  // cells on board
  cells: Cell[] = [];

  // game active or over
  gameState = 'active';


  constructor() {
    this.resetBoardValues();
    this.boardValueChange.subscribe(
      (command: string) => this.onBoardValueChange(command)
    );
    this.cells = [
      new Cell(0, 0), new Cell(0, 1), new Cell(0, 2),
      new Cell(1, 0), new Cell(1, 1), new Cell(1, 2),
      new Cell(2, 0), new Cell(2, 1), new Cell(2, 2)];

  }

  // Reset to null all board values
  resetBoardValues() {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].resetValue();
    }
    this.boardValueChange.next('reset');
  }

  onBoardValueChange(command: string) {
    if (command === 'reset') {
      //

    }else if (command === 'play') {
      // check if game is over
      if (this.isGameOver() !== null) {
        this.gameState = 'over';
      }

      if (this.gameState === 'active') {
        if (this.whoseTurn === 'player') {
          this.whoseTurn = 'cpu';

          // cpu ya oynat
          setTimeout(() => {
            this.playForCPU();
            console.log('boardValueChange1');
            // oynandığını bildir
            this.boardValueChange.next('play');
          }, Math.floor((Math.random() * 10) + 500));

        }else if (this.whoseTurn === 'cpu') {
          this.whoseTurn = 'player';
        }
      }
    }
  }

  // makes a random move (needs improvement)
  playForCPU() {
    let played = false;

    while (!played) {
      console.log('cpu oynuyor');
      played = this.cells[Math.floor((Math.random() * 8))].setValue('o');
    }
  }

  isGameOver() {
    let winner = null;

    // dikey
    for (let i = 0; i < 3; i++) {
      if ( this.cells[i].value === this.cells[i + 3].value &&
        this.cells[i + 3].value === this.cells[i + 6].value &&
        !this.cells[i].isEmpty()) {
        winner = this.cells[i].value;
      }
    }

    // yatay
    if (winner === null) {
      for (let i = 0; i < 9; i += 3) {
        if ( this.cells[i].value === this.cells[i + 1].value &&
          this.cells[i + 1].value === this.cells[i + 2].value &&
          !this.cells[i].isEmpty()) {
          winner = this.cells[i].value;
        }
      }
    }

    // çapraz
    if (winner === null) {
      if ( this.cells[0].value === this.cells[4].value &&
        this.cells[4].value === this.cells[8].value &&
        !this.cells[0].isEmpty()) {
        winner = this.cells[0].value;
      }
    }
    if (winner === null) {
      if ( this.cells[2].value === this.cells[4].value &&
        this.cells[4].value === this.cells[6].value &&
        !this.cells[2].isEmpty()) {
        winner = this.cells[2].value;
      }
    }

    // berabere mi
    if (winner === null) {
      let thereEmptyCell = false;
      for (let i = 0; i < this.cells.length; i++) {
        const cell = this.cells[i];

        if (cell.isEmpty()) {
          thereEmptyCell = true;
        }
      }

      winner = thereEmptyCell === false ? 'draw' : winner;
    }

    console.log('winner ', winner);
    if (winner != null) {
      this.gameOverAlert.next(winner);
    }

    return winner;
  }

  restart() {
    this.resetBoardValues();
    this.whoseTurn = 'player';
    this.gameState = 'active';
  }
}
