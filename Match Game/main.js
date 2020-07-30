document.addEventListener("DOMContentLoaded",function() {

    const cardArray = [
        {
            name:"cheeseburger",
            img: "images/cheeseBurger.png"
        },
        {
            name:"cheeseburger",
            img: "images/cheeseBurger.png"
        },
        {
            name:"fries",
            img: "images/fries.png"
        },
        {
            name:"fries",
            img: "images/fries.png"
        },
        {
            name: "hotdog",
            img: "images/hotdog.png"
        },
        {
            name: "hotdog",
            img: "images/hotdog.png"
        },
        {
            name: "ice-cream",
            img: "images/ice-cream.png"
        },
        {
            name: "ice-cream",
            img: "images/ice-cream.png"
        },
        {
            name: "milkshake",
            img: "images/milkshake.png"
        },
        {
            name: "milkshake",
            img: "images/milkshake.png"
        },
        {
            name: "pizza",
            img: "images/pizza.png"
        },
        {
            name: "pizza",
            img: "images/pizza.png"
        }
         
    ]
    //cardArray.sort(() => .5-Math.random())
    const grid = document.querySelector(".grid");
    // create Board
    function createBoard() {
        for(let i =0; i < cardArray.length; i++) {
            let card = document.createElement("img");
            card.setAttribute("src","images/blank.png");
            card.setAttribute("data-id",i);
            grid.appendChild(card);
            card.addEventListener("click",flipCard);
        }
    }
//check for match
const cardsWon = [];
const result = document.getElementById("result");
function checkForMatch() {
    const cards = document.querySelectorAll("img");
    let optionOneId = cardsChosenId[0];
    let optionTwoId = cardsChosenId[1];
    
    if(cardsChosen[0] === cardsChosen[1]) {
        alert("You found a match!");
        cards[optionOneId].setAttribute("src","images/white.png");
        cards[optionTwoId].setAttribute("src","images/white.png");
        cardsWon.push(cardsChosen[0]);
        console.log(cardsWon);
    }
    else {
        alert("Wrong match");
        cards[optionOneId].setAttribute("src","images/blank.png");
        cards[optionTwoId].setAttribute("src","images/blank.png");
    }
    cardsChosen = [];
    cardsChosenId = [];
    if(cardsWon.length == cardArray.length/2) {
        result.innerHTML = "You did it! Game is over";
    }
}

// Flip a card
let cardsChosen = [];
let cardsChosenId = [];
function flipCard(e) {
    if(e.target.getAttribute("src") != "images/white.png") {
        var cardId = e.target.dataset.id
        cardsChosen.push(cardArray[cardId].name)
        //console.log(cardId);
        cardsChosenId.push(cardId)
        e.target.setAttribute("src",cardArray[cardId].img)
        if(cardsChosen.length == 2) {
            setTimeout(checkForMatch,500)
        }
    }
    else {
        console.log("You picked a white space"); 
    }
}



createBoard();



})

