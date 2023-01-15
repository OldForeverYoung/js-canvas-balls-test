// Import stylesheets
import './style.css';
//я получу власть - которая и не снилась моему отцу! (с)
const canvas = document.getElementById('canvas');
canvas.width = 300;
canvas.height = 200;
const ctx = canvas.getContext('2d');

const DATA = {
  FPS: 60,
  TICK: 10,
  WIDTH: canvas.width,
  HEIGHT: canvas.height,
  score: 0,
  maxscore: 0, // так и надо
  ballsId: [0, 1, 2, 3],
  ballsSpeedX: [createSpeed(), createSpeed(), createSpeed(), createSpeed()],
  ballsSpeedY: [createSpeed(), createSpeed(), createSpeed(), createSpeed()],
  ballsX: [
    canvas.width / 2,
    canvas.width / 3,
    canvas.width / 4,
    canvas.width / 8,
  ],
  ballsY: [
    canvas.height - 10,
    canvas.height - 30,
    canvas.height - 30,
    canvas.height - 30,
  ],
  ballsColor: [
    `rgb(${255 * Math.random()},${255 * Math.random()} ,${
      255 * Math.random()
    } )`,
    `rgb(${255 * Math.random()},${255 * Math.random()} ,${
      255 * Math.random()
    } )`,
    `rgb(${255 * Math.random()},${255 * Math.random()} ,${
      255 * Math.random()
    } )`,
    `rgb(${255 * Math.random()},${255 * Math.random()} ,${
      255 * Math.random()
    } )`,
  ],
  stack: 0,
  costile: 0,
};
console.log(DATA);
// это ещё допилим
function createSpeed() {
  let rand = Math.random();
  let speed = null;
  if (rand < 0.5) {
    speed = 2 * Math.random();
  } else {
    speed = 2 * Math.random() * -1;
  }
  return speed;
}
console.log(`x = ${canvas.width}; y = ${canvas.height}`);

function drawBall() {
  ctx.beginPath();
  // осторожнее при выходе
  for (let balls = 0; balls < DATA.ballsId.length; balls++) {
    ctx.arc(DATA.ballsX[balls], DATA.ballsY[balls] - 10, 10, 0, Math.PI * 2);
    ctx.fillStyle = DATA.ballsColor[balls];
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
  }
  ctx.closePath();
}
function newCheckCollision() {
  // несмотря на неправильный подход к объектам, думаю, можно перебрать коллизии все ко всем
  // я пытался найти решение, но...
  // есть всякие map и прочее. Чёт не помогло.

  for (let ballsOne = 0; ballsOne < DATA.ballsId.length; ballsOne++) {
    for (let ballsTwo = 0; ballsTwo < DATA.ballsId.length; ballsTwo++) {
      if (ballsOne != ballsTwo) {
        let xcors = DATA.ballsX[ballsOne] - DATA.ballsX[ballsTwo];
        let ycors = DATA.ballsY[ballsOne] - DATA.ballsY[ballsTwo];
        if (xcors < 10 && xcors > -10) {
          if (ycors < 20 && ycors > -20) {
            //думаем дальше
            //крч, завтра наверное делаем форк и возвращаемся к первой цели
          }
        }
      }
    }
  }

  /*
  for (let ballsOne = 0; ballsOne < DATA.ballsId.length; ballsOne++) {
    for (let ballsTwo = 0; ballsTwo < DATA.ballsId.length; ballsTwo++) {
      if (ballsOne != ballsTwo) {
        let xcors = DATA.ballsX[ballsOne] - DATA.ballsX[ballsTwo];
        let ycors = DATA.ballsY[ballsOne] - DATA.ballsY[ballsTwo];
        if (xcors < 10 && xcors > -10) {
          if (ycors < 20 && ycors > -20) {
            let xspeed =
              DATA.ballsSpeedX[ballsOne] - DATA.ballsSpeedX[ballsTwo];
            let yspeed =
              DATA.ballsSpeedY[ballsOne] - DATA.ballsSpeedY[ballsTwo];
            //DATA.stack++;
            //console.log(DATA.stack);
            //так, а что теперь всё таки сделать с этой информацией?)
            //в целом, так как я проверяю всех ко всем

            if (xspeed > 0) {
              DATA.ballsSpeedX[ballsOne] = -DATA.ballsSpeedX[ballsOne];
            }
            if (yspeed > 0) {
              DATA.ballsSpeedY[ballsOne] = -DATA.ballsSpeedY[ballsOne];
            }
            //это конечно хуёвый прототип)
          }
        }
      }
    }
  }
  */
}
/*
function checkCollision(x1, y1, speedX1, speedY1, x2, y2, speedX2, speedY2) {
  if (DATA.stack >= 100) {
    return;
  }
  let xcors = x1 - x2;
  let ycors = y1 - y2;
  if (xcors < 10 && xcors > -10) {
    if (ycors < 20 && ycors > -20) {
      DATA.stack++;
      let vx1 = speedX1 + speedX2;
      let vy1 = speedY1 + speedY2;
      DATA.speedX = vx1 / 2;
      DATA.twoSpeedX = -vx1 / 2;
      DATA.speedY = vy1 / 2;
      DATA.twoSpeedY = -vy1 / 2;

      console.log(vx1, vy1);
    }
  }
}
*/
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // очистка отрисовки
  drawBall();
}
function mathTick() {
  newCheckCollision();
  for (let ball = 0; ball < DATA.ballsX.length; ball++) {
    if (DATA.ballsX[ball] > DATA.WIDTH - 10) {
      DATA.ballsSpeedX[ball] = -DATA.ballsSpeedX[ball];
      DATA.ballsX[ball] = DATA.WIDTH - 10.1;
    }
    if (DATA.ballsX[ball] < 10) {
      DATA.ballsSpeedX[ball] = -DATA.ballsSpeedX[ball];
      DATA.ballsX[ball] = 10.1;
    }

    if (DATA.ballsY[ball] > DATA.HEIGHT) {
      DATA.ballsSpeedY[ball] = -DATA.ballsSpeedY[ball];
      DATA.ballsY[ball] = DATA.HEIGHT - 0.1;
    }
    if (DATA.ballsY[ball] < 20) {
      DATA.ballsSpeedY[ball] = -DATA.ballsSpeedY[ball];
      DATA.ballsY[ball] < 20.1;
    }

    DATA.ballsX[ball] += DATA.ballsSpeedX[ball];
    DATA.ballsY[ball] += DATA.ballsSpeedY[ball];
  }
}
setInterval(mathTick, DATA.TICK); // расчёт
setInterval(draw, 1000 / DATA.FPS); // прорисовка
