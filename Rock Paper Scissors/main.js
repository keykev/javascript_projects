let userScore = 0;
let computerScore = 0;

const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");

const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");
const result_div = document.querySelector(".result p");

function getComputerChoice() {
    const choices = ["rock","paper","scissors"];
    const randomNumber = Math.floor(Math.random()*choices.length);
    //console.log(choices[randomNumber])
    return choices[randomNumber]
}

function win(user,comp) {
    userScore++;
    userScore_span.innerHTML = userScore;
    let smallUser = "user".sub().fontsize(5);
    let smallComp = "computer".sub().fontsize(5);
    result_div.innerHTML = `${user} ${smallUser} beats ${comp} ${smallComp}. You win :)`;
}

function lose(user,comp) {
    computerScore++;
    computerScore_span.innerHTML = computerScore;
    let smallUser = "user".sub().fontsize(5);
    let smallComp = "computer".sub().fontsize(5);
    result_div.innerHTML = `${user} ${smallUser} loses to ${comp} ${smallComp}. You lose :(`;
}
function tie(user,comp) {
    let smallUser = "user".sub().fontsize(5);
    let smallComp = "computer".sub().fontsize(5);
    result_div.innerHTML = `${user}${smallUser} and ${comp} ${smallComp} ties`;
}

function game(userChoice) {
    const computerChoice = getComputerChoice();
    console.log(userChoice);
     console.log(computerChoice);

    switch(userChoice + computerChoice) {
        case "scissorspaper":
        case "paperrock":
        case "rockscissors":
            win(userChoice,computerChoice);
            break;
        
        case "scissorsrock":
        case "paperscissors":
        case "rockpaper":
           lose(userChoice,computerChoice);
            break;

        case "scissorsscissors":
        case "paperpaper":
        case "rockrock":
            tie(userChoice,computerChoice);
            break;
    }
}

function main() {
    rock_div.addEventListener("click",()=> {
        game("rock");
    })
    paper_div.addEventListener("click", () => {
        game("paper");
    })
    scissors_div.addEventListener("click", () => {
        game("scissors");
    })
}

main();
