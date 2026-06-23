//select all elements
let choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
let userScore = document.querySelector("#user-score");
let compScore = document.querySelector("#computer-score");

let userScoreVal = 0;
let compScoreVal = 0;

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
        
    });
});

//draw game 
const drawGame = () => {
    msg.innerText = "Game was a Draw!, Play again";
    msg.style.backgroundColor = "blue";  
};
//winner function
const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScoreVal++;
        userScore.innerText = userScoreVal;
        console.log("you win!");
        msg.innerText = `You Win! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScoreVal++;
        compScore.innerText = compScoreVal;
        console.log("you lose!");
        msg.innerText = `You Lose! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "orange";
    }
};

const playGame = (userChoice) => {
    console.log ("user choice = ", userChoice);
    const compChoice = genCompChoice();
    console.log("comp choice = ", compChoice);

    if (userChoice === compChoice) {
        drawGame();
    }
    //winning condition of user
    else {
        let userWin = true;
        if(userChoice === "rock") {
            //scissor, paper
            userWin = compChoice === "paper" ? false : true;
        }
        else if(userChoice === "paper") {
            //rock, scissor
            userWin = compChoice === "scissor" ? false : true;
        }
        else {
            //rock, paper
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

//computer choice 
let genCompChoice = () => {
    let options = ["rock", "paper", "scissor"];
    let randomIdx = Math.floor(Math.random() * 3);
    return options[randomIdx];
};


