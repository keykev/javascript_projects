const canvas = document.getElementById("break-out");
const ctx = canvas.getContext("2d");
const image = document.getElementById("background-image")
const star = document.getElementById("score")
const life = document.getElementById("life");
const level = document.getElementById("level");

// Paddle properties:
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;
const PADDLE_MARGIN_BOTTOM = 50;

const paddle = {
    x: canvas.width/2-PADDLE_WIDTH/2,
    y: canvas.height - PADDLE_HEIGHT - PADDLE_MARGIN_BOTTOM,
    width: PADDLE_WIDTH,
    height:PADDLE_HEIGHT,
    dx: 5
}
//draw paddle
function drawPaddle() {
    ctx.fillStyle = "#2e3548";
    ctx.fillRect(paddle.x,paddle.y,paddle.width,paddle.height);

    ctx.strokeStyle = "#ffcd05";
    ctx.strokeRect(paddle.x,paddle.y,paddle.width,paddle.height);
}

//paddle eventListenres()
let pressedRight;
let pressedLeft;
    document.addEventListener("keydown",(e) => {
        if(e.key == "ArrowRight") {
            pressedRight = true;
        }
        else if (e.key == "ArrowLeft") {
            pressedLeft = true;
        }
    })

    document.addEventListener("keyup",(e) => {
        if(e.key == "ArrowRight") {
            pressedRight = false;
            
        }
        else if (e.key == "ArrowLeft") {
            pressedLeft = false;
            
        }
    })
// move paddle
function movePaddle() {
        if(pressedLeft && paddle.x > 0) {
            paddle.x -= paddle.dx;
        }
        else if(pressedRight && paddle.x+paddle.width < canvas.width) {
            paddle.x += paddle.dx;
        }
    }
// ball properties 
const BALL_RADIUS = 20;
const ball = {
    x: canvas.width/2,
    y: paddle.y-BALL_RADIUS,
    radius: BALL_RADIUS,
    speed: 3,
    dx: 3,
    dy: -3,
}
// draw Ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2)
    ctx.fillStyle = "#ffcd05";
    ctx.fill();
    ctx.strokeStyle = "#2e3548";
    
    ctx.stroke();
    ctx.closePath();
}
// move ball()
function moveBall() {
    ball.x += ball.dx;
    ball.y +=ball.dy;
}
//ball wall collision


let LIFE = 3;
function ballWallCollision() {
    if(ball.x+ball.radius >= canvas.width || ball.x-ball.radius <=0) {
        ball.dx *= -1;
        
    }
    else if (ball.y-ball.radius <= 0) {
        ball.dy *= -1;
    
    }
    else if(ball.y+ball.radius > canvas.height) {
        LIFE--;
        resetBall();
        console.log(LIFE);
    }
}
//reset Ball() 
function resetBall() {
    ball.x = canvas.width/2;
    ball.y = paddle.y-ball.radius;
    ball.dx = 3 * (Math.random()*2-1);
    ball.dy = -3;
}
// ball-paddle collision
function ballCollision() {
    if(ball.y+ball.radius> paddle.y && ball.y < paddle.y + paddle.height && ball.x+ball.radius > paddle.x && ball.x-ball.radius <paddle.x+paddle.width) {
        let collidePoint = ball.x - (paddle.x + paddle.width/2)
        collidePoint = collidePoint / (paddle.width/2)

        let angle = collidePoint * (Math.PI/3)
        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = ball.speed * Math.cos(angle)* -1;
    }
}
// brick property
const brick = {
    row: 3,
    column:5,
    width:55,
    height:20,
    offSetLeft: 20,
    offSetTop: 20,
    marginTop: 40,
    fillColor: "#2e3548",
    strokeColor: "#FFF"
}
// create bricks
let bricks = []
function createBricks() {
    for(let r = 0; r < brick.row; r++) {
       bricks[r] = [];
        for(let c = 0; c < brick.column; c++) {
            bricks[r][c] = {
                x: c * (brick.width+brick.offSetLeft) + brick.offSetLeft,
                y: r * (brick.height+brick.height) + brick.marginTop + brick.offSetTop,
                status: true
            }
        }
    }
}
createBricks();
// draw bricks
function drawBricks() {
    for(let r = 0; r < brick.row; r++) {
        for(let c = 0; c <brick.column; c++) {
            if(bricks[r][c].status) {
                ctx.fillStyle = brick.fillColor;
                ctx.fillRect(bricks[r][c].x,bricks[r][c].y,brick.width,brick.height);
                ctx.strokeStyle = brick.strokeColor;
                ctx.strokeRect(bricks[r][c].x,bricks[r][c].y,brick.width,brick.height)
            }
        }   
    }
}
// ball brick collision
let SCORE = 0;
const SCORE_UNIT = 10;

function ballBrickCollision() {
    for(let r = 0; r < brick.row; r++) {
        for(let c = 0; c < brick.column; c++) {
            let b = bricks[r][c]
            if(b.status) {
                if(ball.x+ball.radius > b.x && ball.x-ball.radius < b.x+brick.width && ball.y + ball.radius > b.y && ball.y - ball.radius < b.y + brick.height) {
                    b.status = false;
                    ball.dy = -ball.dy;
                    SCORE +=SCORE_UNIT;
                    
                }
            }
        }
    }
}
// show game stats
function showGameStats(text, textX, textY, img, imgX, imgY) {
    ctx.fillStyle = "#fff";
    ctx.font = "25px Germania One";
    ctx.fillText(text,textX,textY);
    ctx.drawImage(img, imgX, imgY, 25,25)
}
//game over
let GAME_OVER = false;
function gameOver() {
    if(LIFE <= 0) {
        GAME_OVER = true;
    }
}
//LEVEL UP;
let LEVEL = 1;
const MAX_LEVEL = 3;

function levelUp() {
    let isLevelDone = true;
    for(let r= 0; r < brick.row; r++){
        for(let c = 0; c < brick.column; c++) {
            isLevelDone = isLevelDone && !bricks[r][c].status      
        }
    }
    if(isLevelDone) {
        if(LEVEL >=MAX_LEVEL) {
            GAME_OVER = true;
            return;
        }
            brick.row++;
            createBricks();
            ball.speed += .5;
            resetBall();
            LEVEL++;    
    }
}
// Sounds
const BACKGROUND_SOUND = new Audio();
BACKGROUND_SOUND.src = "./sounds/wallsound.mp3";
BACKGROUND_SOUND.play();
BACKGROUND_SOUND.muted = true;

//game loop
function loop() {
    ctx.drawImage(image,0,0,canvas.width,canvas.height);
    drawPaddle();
    movePaddle();
    drawBall();
    moveBall();
    ballWallCollision();
    ballCollision();
    drawBricks();
    ballBrickCollision();   
    showGameStats(SCORE,35,25,star,5,5);
    showGameStats(LIFE, canvas.width-25,25,life,canvas.width-55,5);
    showGameStats(LEVEL, canvas.width/2, 25,level,canvas.width/2-30,5)
    levelUp();
    gameOver();
    if(!GAME_OVER) {
        requestAnimationFrame(loop);
    }
}
loop();
//console.log(bricks)
