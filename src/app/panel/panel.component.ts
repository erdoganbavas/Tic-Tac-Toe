import { Component, OnInit } from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  info = 'Start, Your turn';

  constructor(private gameService: GameService) {
    this.gameService.boardValueChange.subscribe(
      (command: string) => {
        if (command === 'play' && this.gameService.gameState === 'active') {
          if (this.gameService.whoseTurn === 'player') {
            this.info = 'Your turn';
          }else {
            this.info = 'CPU\'s turn';
          }
        }
      }
    );

    this.gameService.gameOverAlert.subscribe(
      (winner: string) => {
        console.log('GO subs', winner);
        if (winner === GameService.player) {
          this.info = 'You Win!';
        } else if (winner === GameService.cpu) {
          this.info = 'CPU Win!';
        }else if (winner === 'draw') {
          this.info = 'DRAW!';
        }
      }
    );
  }

  ngOnInit() {
  }

  onRestartClick() {
    this.gameService.restart();
    this.info = 'Game is restarted.';
  }
}
