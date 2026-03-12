// declare the board data for a game, using 3 arrays
// "-" indicates unmarked, "x" indicates an X mark, "o" indicates an O mark
let rowA = ["-", "-", "-"];
let rowB = ["-", "-", "-"];
let rowC = ["-", "-", "-"];

//track who's turn it is
let currentTurn = "x";

//track number of turns left
let remainingTurns = 9;

//track if game is over
let gameOver = false;

//set up blank variable for current player DOM
let currentPlayer;

function checkGameboard(checkA, checkB, checkC) {
  console.log("Function Started"); //function started

  let board = [checkA, checkB, checkC];
  console.log("Board:", board); //visually confirms your data

  //check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2] &&
      board[i][0] !== "-"
    ) {
      console.log("Row win detected:", board[i][0]); //row wins
      return board[i][0];
    }
  }

  //check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i] &&
      board[0][i] !== "-"
    ) {
      console.log("Column win detected:", board[0][i]); //column wins
      return board[0][i];
    }
  }




  //check diagnoals
  if (
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2] &&
    board[0][0] !== "-"
  ) {
    console.log("/(1)/Diagnoal win detected:", board[0][0]); //diagnoal (1) win
    return board[0][0];
  }

  if (
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0] &&
    board[0][2] !== "-"
  ) {
    console.log("/(2)/Diagnoal win detected:", board[0][2]); //diagnoal (2) win
    return board[0][2];
  }

  console.log("No winner — returning draw"); //no winner: its a draw
  return "d";
}

//function to handle clicks
function clickSquare() {



    //only if space is empty
    if ( (this.innerHTML == "") && (!gameOver) ) {
        
        //set the space
        this.innerHTML = currentTurn;

        //substract 1 frpm remaining turns
        remainingTurns--;
        console.log("Remaining turns:" + remainingTurns)

        //update the array of row with the player value
        if (this.id == "a1") rowA[0] = currentTurn;
        if (this.id == "a2") rowA[1] = currentTurn;
        if (this.id == "a3") rowA[2] = currentTurn;

        if (this.id == "b1") rowB[0] = currentTurn;
        if (this.id == "b2") rowB[1] = currentTurn;
        if (this.id == "b3") rowB[2] = currentTurn;

        if (this.id == "c1") rowC[0] = currentTurn;
        if (this.id == "c2") rowC[1] = currentTurn;
        if (this.id == "c3") rowC[2] = currentTurn;

        //OUTPUT arrays to console
        console.log ("Rows:");
        console.log (rowA);
        console.log (rowB);
        console.log (rowC);

        // get a handle on the DOM element to be updated with the outcome
        let gameOutputMsg = document.querySelector("#gameResult");

        // call your function checkGameboard() with the 3 rows
        let winState = checkGameboard(rowA, rowB, rowC);

        // test the returned value of the function
        if (winState == "x") {
            gameOutputMsg.innerHTML = "X wins";
            gameOver = true;
        } else if (winState == "o") {
            gameOutputMsg.innerHTML = "O wins";
            gameOver = true;
        } else if ((winState == "d") && (remainingTurns == 0)) {
            gameOutputMsg.innerHTML = "draw";
            gameOver = true;
        } 

        //reveal game outcome after game
        if (gameOver) {
            document.querySelector("#gameResult").style.display = "flex";
        }

        //flip turn back and forth
        if (currentTurn == "x") currentTurn = "o";
        else currentTurn = "x";



        //update next player DOM element
        currentPlayer.innerHTML = currentTurn;
    }


}

//wait for the document to load before adding clickable events
document.addEventListener("DOMContentLoaded", function(){

    //find all the clickable spaces
    let allSpaces = document.querySelectorAll(".gameSpace");

    //loop with "for-of" through all the clickable spaces
    for(let eachSpace of allSpaces) {
        eachSpace.addEventListener("click", clickSquare);
    }

    //update current player DOM element with first player
    currentPlayer = document.querySelector("#currentPlayer span");
    currentPlayer.innerHTML = currentTurn;
});
