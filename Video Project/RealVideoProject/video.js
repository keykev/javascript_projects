const btn = document.querySelector(".btn-video");
const video = document.querySelector(".video-container");

btn.addEventListener("click",function() {
    if(!btn.classList.contains("slide")){
        btn.classList.add("slide");
        video.pause();
    }
    else {
        btn.classList.remove("slide");
        video.play();
    }
})