const text = document.querySelector(".text");
const container = document.querySelector(".container");

const totalTime = 7500;
const breatheTime = (totalTime/5)*2;
const holdTime = breatheTime-1500;

breatheAnimation();
function breatheAnimation() {
    text.innerHTML = "Breathe In!";
    container.className = "container grow"
    setTimeout(() => {
        text.innerHTML = "Hold!"
        
        setTimeout(() => {
            text.innerHTML = "Breathe Out";
            container.className = "container shrink";
        }, holdTime)
    }, breatheTime)
}

setInterval(breatheAnimation, totalTime);