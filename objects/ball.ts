import { Position2d, Velocity2d } from "../interfaces";

export default class Ball {
  private pos: Position2d;
  private prevPos: Position2d[];
  private move: number = 0;
  private vel: Velocity2d;
  private moving: boolean = false;

  constructor(pos: Position2d = {x: 0, y: 0}) {
    this.pos = pos;
    this.prevPos = [this.pos];
    this.vel = {x: 0, y: 0};
  }

  public isInside(width: number, height: number): boolean {
    return this.pos.x >= 0 && this.pos.x <= width && this.pos.y >= 0 && this.pos.y <= height;
  }

  public getMove(): number {
    return this.move;
  }

  public setPosition(pos: Position2d) {
    this.pos = pos;
  }

  public getPosition(): Position2d {
    return this.pos;
  }

  public setVelocity(vel: Velocity2d) {
    this.vel = vel;
  }

  public getVelocity(): Velocity2d {
    return this.vel;
  }

  public getPreviousPosition(): Position2d {
    if(this.move == 0) {
      return this.prevPos[0];
    }
    const index = this.move - 1;
    const pos = this.prevPos[index];

    return pos;
  }

  public start(vel: Velocity2d): boolean {
    if(this.moving) return false;
    this.moving = true;
    this.vel = vel;
    return true;
  }

  public stop(): boolean {
    if(!this.moving) return false;
    this.moving = false;
    this.vel.x = 0;
    this.vel.y = 0;
    return true;
  }

  public update() {
    this.move += 1;
    this.prevPos.push(this.pos);
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
}