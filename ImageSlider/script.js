const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");
const container = document.querySelector(".images")

let counter = 1;

nextBtn.addEventListener("click",nextSlide)
prevBtn.addEventListener("click",prevSlide);


function nextSlide() {
    container.animate([{opacity: ".1"},{opacity: "1.0"}],{duration: 1000},{fill: "forwards"})

  if(counter == 5){
      counter = 0; 
  }
  counter++ 
  container.style.backgroundImage = `url(./Image/image-${counter}.jpg)`
  
}

function prevSlide() {
    if(counter == 1) {
        counter = 6;
    }
    counter--;

    container.style.backgroundImage = `url(./Image/image-${counter}.jpg)`;
}