import Ball from "./ball";
import { Position2d, Velocity2d } from "../interfaces";
import Config from "../config";

function createInitialField(): string[][] {
  const field = [];
  const width = Config.getWidth();
  const height = Config.getHeight();
  for(let i = 0; i < height; i++) {
    let row = '';
    for(let j = 0; j < width; j++) {
      row += ' ';
    }
    field.push(row.split(''));
  }

  return field;
}

export default class Game {
  private field: string[][];
  private ball: Ball;

  public width: number;
  public height: number;

  constructor(ball: Ball) {
    this.field = createInitialField();
    this.width = this.field[0].length;
    this.height = this.field.length;
    this.ball = ball;

    // move ball to the center if its position is outside the field
    if(!ball.isInside(this.width, this.height)) {
      const x = Math.floor(this.width / 2);
      const y = Math.floor(this.height / 2);
      const pos: Position2d = {x, y};
      ball.setPosition(pos);
    }

    // insert ball into field
    const {x, y} = this.ball.getPosition();
    this.field[y][x] = 'O';
  }

  private resetFieldPosition(pos: Position2d) {
    const {x,y} = pos;
    const trace = Config.getTrace();
    if(trace == 'TRUE') {
      const sequence = Config.getTraceSequence();
      const move = this.ball.getMove();
      const sequenceIndex = (move + sequence.length) % sequence.length;
      const char = sequence[sequenceIndex];
      this.field[y][x] = char;
      const ball = Config.getBall();
      const ballSize = ball.length;
      const ballSideSize = (ballSize - 1) / 2;
      for(let i = ballSideSize * -1; i < ballSideSize + 1; i++) {
        if(i == 0) continue;
        this.field[y][x + i] = ' ';
      }
    } else {
      const ball = Config.getBall();
      const ballSize = ball.length;
      const ballSideSize = (ballSize - 1) / 2;
      for(let i = ballSideSize * -1; i < ballSideSize + 1; i++) {
        this.field[y][x + i] = ' ';
      }
    }
  }

  private moveBallTo(pos: Position2d) {
    const {x,y} = pos; // x:1 y:0
    const ball = Config.getBall(); // DVD
    const ballSize = ball.length; // 3
    const ballSideSize = (ballSize - 1) / 2; // 1
    let ballIndex = 0;
    for(let i = ballSideSize * -1; i < ballSideSize + 1; i++) {
      this.field[y][x + i] = ball[ballIndex];
      ballIndex++;
    }
  }

  public start(moveDirection: Velocity2d) {
    this.ball.start(moveDirection);
  }

  public stop() {
    this.ball.stop();
  }

  public update() {
    const oldPos = this.ball.getPosition();
    this.resetFieldPosition(oldPos);

    const vel = this.ball.getVelocity();
    let velChanged = false;
    const ballWidth = (Config.getBall().length - 1) / 2;

    if((vel.x < 0 && oldPos.x - ((vel.x * -1) -1) - ballWidth <= 0) || (vel.x > 0 && oldPos.x + (vel.x -1) + ballWidth >= this.width -1)) {
      velChanged = true;
      vel.x *= -1;
    }

    if((vel.y < 0 && oldPos.y - ((vel.y * -1) -1) <= 0) || (vel.y > 0 && oldPos.y + (vel.y -1) >= this.height -1)) {
      velChanged = true;
      vel.y *= -1;
    }

    if(velChanged) {
      // update velocity because ball touched the side
      this.ball.setVelocity(vel);
    }

    this.ball.update();
    const newPos = this.ball.getPosition();
    this.moveBallTo(newPos);
  }

  public draw() {
    console.clear();
    let borderStr = '';
    let width = Config.getWidth() + 2;
    const border = Config.getBorder();
    for(let i = 0; i < width; i++) {
      borderStr += border;
    }
    console.log(borderStr);
    for(let i = 0; i < this.field.length; i++) {
      const row = border + this.field[i].join('') + border;
      console.log(row);
    }
    console.log(borderStr);
  }
}