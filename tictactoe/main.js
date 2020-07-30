var origBoard;

var winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
];
const cells = document.querySelectorAll(".cell");
//checkEnd lets up check who wins for the last value. if not included will give tie.
var checkEnd = 0;

window.addEventListener("click", (e) => {
   // console.log(e.target.id);
    if(e.target.id == "x") {
        var userPlayer = "X";
        var aiPlayer = "O";
        //console.log(" x work");
        document.querySelector(".game-page").style.display = "block";
        document.querySelector(".introduction").style.display = "none";
        startGame();
    }
    else if (e.target.id == "o") {
        var userPlayer = "O";
        var aiPlayer = "X";
        //console.log("o work");
        document.querySelector(".game-page").style.display = "block";
        document.querySelector(".introduction").style.display = "none";
        startGame();
    }
    function startGame() {
        checkEnd = 0;
        document.querySelector(".endgame").style.display = "none";
        origBoard = Array.from(Array(9).keys());
        //console.log(origBoard.length)
        for(let i = 0; i < cells.length; i++){
            cells[i].innerHTML = "";
            cells[i].style.removeProperty("background-color");
            cells[i].addEventListener("click",turnClick,false);
        }
        }
        
        function turnClick(e) {
            if(typeof origBoard[e.target.id] == "number") {
                turn(e.target.id,userPlayer)
                if(!checkTie() && checkEnd == "0") {
                    turn(bestSpot(),aiPlayer);
                }
            }
        }
        
        function turn(id,player) {
          origBoard[id] = player;
          document.getElementById(id).innerHTML = player;
          let gameWon = checkWin(origBoard,player);
          if(gameWon) gameOver(gameWon);
        }
        
        function checkWin(board, player) {
            let play = board.reduce((total,letter,index) => {
                return (letter == player ? total.concat(index) : total)
            },[])
        
            let gameWon = null;
        
            for(let [index,win] of winCombos.entries()) {
                if(win.every(elem => play.indexOf(elem) > -1)) {
                    gameWon = {index:index, player: player}
                }
            }
            return gameWon;
        }
        
        function gameOver(gameWon) {
            for(let index of winCombos[gameWon.index]) {
                document.getElementById(index).style.backgroundColor = gameWon.player == userPlayer ? "blue" : "red";
                checkEnd++
            }
            for(var i = 0; i < cells.length; i++) {
                cells[i].removeEventListener("click", turnClick, false);
            }
            declareWinner(gameWon.player == userPlayer ? "Human player wins" : "AI wins")
            setTimeout(() => {
                document.querySelector(".game-page").style.display = "none";
                document.querySelector(".introduction").style.display = "block";
            },2000)
           
        }
        
        
        
        function emptySquares() {
            return origBoard.filter(i => typeof i == "number");
        }
        
        function bestSpot() {
            return emptySquares()[0];
        }
        
        function declareWinner(who) {
            document.querySelector(".endgame").style.display = "block";
            document.querySelector(".text").innerHTML = who; 
        }
        
        function checkTie() {
            if(emptySquares().length == 0 && (checkEnd == 0)) {
                
                for(var i = 0; i < cells.length; i++) {
                    cells[i].style.backgroundColor = "green";
                    cells[i].removeEventListener("click",turnClick,false);
                }
                declareWinner("Tie Game");
                return true;
            }
            console.log(checkEnd);
            return false;
        }
})









