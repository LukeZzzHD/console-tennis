import { Position2d, Velocity2d } from "./interfaces";

const config: {
  [index: string]: string | number,
  BALL: string,
  BORDER: string
  REFRESH_RATE: number,
  POS_X: number,
  POS_Y: number,
  VEL_X: number,
  VEL_Y: number,
  WIDTH: number,
  HEIGHT: number,
  TRACE: string,
  TRACE_SEQUENCE: string
} = {
  BALL: 'O',
  BORDER: '#',
  REFRESH_RATE: 250,
  POS_X: 0,
  POS_Y: 0,
  VEL_X: 1,
  VEL_Y: 1,
  WIDTH: 45,
  HEIGHT: 15,
  TRACE: 'false',
  TRACE_SEQUENCE: 'X'
}

export default class Config {
  
  public static parseConfigFromArgs() {
    const args = process.argv;
    args.shift();
    args.shift();
    const configArgs = args.filter(arg => arg.includes('=')).map(arg => arg.toUpperCase());
    const configKeys = Object.keys(config);

    configArgs.forEach(arg => {
      const [key, val] = arg.split('=');
      const parsedVal = parseInt(val);
      const value = isNaN(parsedVal) ? val : parsedVal;
      if(configKeys.includes(key)) {
        config[key] = value;
      }
    });

    if(config.BALL.length % 2 == 0) {
      config.BALL += '!';
    }
  }

  public static showConfig(): void {
    console.log(config);
  }

  public static getBall(): string {
    return config.BALL;
  }

  public static getBorder(): string {
    return config.BORDER;
  }

  public static getRefreshRate(): number {
    return config.REFRESH_RATE;
  }

  public static getInitialPosition(): Position2d {
    const pos: Position2d = {x: config.POS_X, y: config.POS_Y};
    return pos;
  }

  public static getInitialVelocity(): Velocity2d {
    const vel: Velocity2d = {x: config.VEL_X, y: config.VEL_Y};
    return vel;
  }

  public static getWidth(): number {
    return config.WIDTH;
  }

  public static getHeight(): number {
    return config.HEIGHT;
  }

  public static getTrace(): string {
    return config.TRACE;
  }

  public static getTraceSequence(): string {
    return config.TRACE_SEQUENCE;
  }
}