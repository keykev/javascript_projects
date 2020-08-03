window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    var bird = new Image()
    bird.src = "./bird.png"

    //Sound
    var fly = new Audio();
    fly.src = "./fly.mp3";

    var scoreSound = new Audio();
    scoreSound.src = "./score.mp3";
    //bird properties
    bx = 10;
    by = 150;

    // background image
    var bg = new Image();
    bg.src = "./bg.png"

    //ground image 
    var fullground = new Image()
    fullground.src = "./ground.png"

    // pipe south image
    var pipeSouth = new Image()
    pipeSouth.src = "./pipeSouth.png"

    // pipe north image 
    var pipeNorth = new Image()
    pipeNorth.src = "./pipeNorth.png"

    //moving pipes
    var pipe = [];
    pipe[0] = {
        x:canvas.width,
        y:0
    }
    // positionth pipe correctly wrt north pipe
    var gap = 85;
    let constant = pipeNorth.height + gap
    console.log(fullground.height)
    //gravity
    const gravity = 1.5;
    //score
    let score = 0;

    function draw() {
        ctx.drawImage(bg,0,0);
        //put in random pipes
        for(let i = 0; i < pipe.length; i++) {
            ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
            ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant)

            pipe[i].x--

            if(pipe[i].x === 100) {
                pipe.push({
                    x:canvas.width,
                    y:Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
                })
            }
            if(bx+bird.width >= pipe[i].x && bx <= pipe[i].x+pipeNorth.width &&(by<=pipe[i].y+pipeNorth.height || by + bird.height >=pipe[i].y+constant) || by + bird.height >= canvas.height-fullground.height) {
                location.reload();
            }

            if(pipe[i].x == 5) {
                score++
                scoreSound.play();
            }
        }

        ctx.drawImage(fullground,0,canvas.height-fullground.height);

        ctx.drawImage(bird,bx,by);

        by += 1.5;
        ctx.fillStyle = "blue";
        ctx.font = "25px Arial"
        ctx.fillText(`Score: ${score}`,10,canvas.height-10)

        requestAnimationFrame(draw);

    }
    draw();

    //function that moves flappy bird up.
    function moveUp(e) {
        if(e.key == "ArrowUp") {
            by -= 35;
            fly.play();
        }
    }

    window.addEventListener("keydown",moveUp);
})

