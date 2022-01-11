# console-tennis

This is the result of me being pretty bored and having too much time.

## Before you use it
Don't take this "project" too seriously.

Don't bother trying to find ways to break this beauty of an app, it will do that on its own.

 ## How to use it
 1. Build the typescript code using the build script: `npm run build`
 2. Start the application using the start script: `npm start`
 3. Configure your tennis court by adding parameters: `npm start REFRESH_RATE=69 BALL={X} WIDTH=101 HEIGHT=23`

 ## Parameters
 - **BALL** _(String, This is the moving object on your court)_ default: `O`
 - **BORDER** _(Char, Representing the court border)_ default: `#`
 - **REFRESH_RATE** _(Number, Redraw the whole thing every {x} ms)_ default: `250`
 - **POS_X** _(Number, Starting position X)_ default: `0`
 - **POS_Y** _(Number, Starting position Y)_ default: `0`
 - **VEL_X** _(Number, Starting velocity X)_ default: `1`
 - **VEL_Y** _(Number, Starting velocity Y)_ default: `1`
 - **WIDTH** _(Number, Court width)_ default: `45`
 - **HEIGHT** _(Number, Court height)_ default: `15`
 - **TRACE** _(String, Use `true` to draw a line behind your ball)_ default: `false`
 - **TRACE_SEQUENCE** _(String, Sequence of chars used to draw the trace line, f.e. `X_0_X`)_ default: `X`

 ## Future "plans"
 - Add color
 - Add more useless parameters
 - Find something better to do
