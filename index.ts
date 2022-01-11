import Ball from './objects/ball';
import Game from './objects/game';
import Config from './config';

Config.parseConfigFromArgs();

Config.showConfig();

function game() {
  const ball = new Ball(Config.getInitialPosition());
  const game = new Game(ball);

  game.start(Config.getInitialVelocity());

  const interval = setInterval(() => {
    game.draw();
    game.update();
  }, Config.getRefreshRate());
  
  setTimeout(() => {
    clearInterval(interval);
    console.log('GAME OVER!')
  }, (360 * 1000));
}

// start game
game();