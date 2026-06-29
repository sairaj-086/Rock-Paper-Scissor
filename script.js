// Select all elements
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScore = document.querySelector("#user-score");
const compScore = document.querySelector("#computer-score");
const restartBtn = document.querySelector("#restart-btn");
const userChoiceText = document.querySelector("#user-choice");
const compChoiceText = document.querySelector("#computer-choice");
const roundText = document.querySelector("#round");


// Sounds
const clickSound = new Audio("./sounds/click.wav");
const winSound = new Audio("./sounds/win.wav");
const loseSound = new Audio("./sounds/lose.wav");
const drawSound = new Audio("./sounds/draw.mp3");
const gameOverSound = new Audio("./sounds/gameover.wav");

//theme-buttons
const themeButtons = document.querySelectorAll(".theme-btn");

const themes = {
    ocean: {
        bg: "#f4f7fb",
        primary: "#081b31",
        secondary: "#ffffff",
        text: "#111",
        button: "#081b31",
        buttonText: "#ffffff"
    },

    dark: {
        bg: "#121212",
        primary: "#1f1f1f",
        secondary: "#2b2b2b",
        text: "#ffffff",
        button: "#444",
        buttonText: "#ffffff"
    },

    pink: {
        bg: "#fff0f6",
        primary: "#d63384",
        secondary: "#ffffff",
        text: "#333",
        button: "#d63384",
        buttonText: "#ffffff"
    },

    forest: {
        bg: "#edf7ed",
        primary: "#2e7d32",
        secondary: "#ffffff",
        text: "#222",
        button: "#2e7d32",
        buttonText: "#ffffff"
    }
};

// Store all sounds in one array
const allSounds = [
    clickSound,
    winSound,
    loseSound,
    drawSound,
    gameOverSound
];

// Stop every sound
function stopAllSounds() {
    allSounds.forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });
}

// Play only one sound at a time
function playSound(sound) {
    stopAllSounds();
    sound.currentTime = 0;
    sound.play();
}

// Game variables
let userScoreVal = 0;
let compScoreVal = 0;
const WINNING_SCORE = 5;
let gameOver = false;
let currentRound = 1;

// Choice Click
choices.forEach((choice) => {
    choice.addEventListener("click", () => {

        if (gameOver) return;
        playSound(clickSound);

        const userChoice = choice.getAttribute("id");

        // Let click sound play first
        setTimeout(() => {
            playGame(userChoice);
        }, 180);

    });
});

// Draw Game
const drawGame = () => {
    playSound(drawSound);

    msg.innerText = "Game was a Draw! Play again.";
    msg.style.backgroundColor = "orange";
};

// Winner Function
const showWinner = (userWin, userChoice, compChoice) => {

    if (userWin) {

        userScoreVal++;
        userScore.innerText = userScoreVal;
        playSound(winSound);

        msg.innerText = `You Win! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";

    } else {

        compScoreVal++;
        compScore.innerText = compScoreVal;
        playSound(loseSound);

        msg.innerText = `You Lose! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
    }

    if (userScoreVal === WINNING_SCORE) {

        setTimeout(() => {
            playSound(gameOverSound);
        }, 700);

        msg.innerText = "🏆 Congratulations! You won the match!";
        msg.style.backgroundColor = "green";
        gameOver = true;

    } else if (compScoreVal === WINNING_SCORE) {

        setTimeout(() => {
            playSound(gameOverSound);
        }, 700);

        msg.innerText = "😢 Computer won the match!";
        msg.style.backgroundColor = "red";
        gameOver = true;
    }
};

// Highlight Choice
const highlightChoice = (choice) => {

    const selectedChoice = document.querySelector(`#${choice}`);

    selectedChoice.classList.add("selected");

    setTimeout(() => {
        selectedChoice.classList.remove("selected");
    }, 1000);
};

// Play Game
const playGame = (userChoice) => {

    const compChoice = genCompChoice();

    highlightChoice(userChoice);
    highlightChoice(compChoice);

    userChoiceText.innerText = userChoice;
    compChoiceText.innerText = compChoice;

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice !== "paper";
        } else if (userChoice === "paper") {
            userWin = compChoice !== "scissor";
        } else {
            userWin = compChoice !== "rock";
        }
        showWinner(userWin, userChoice, compChoice);
    }
    if (!gameOver) {
        currentRound++;
        roundText.innerText = `Round: ${currentRound}`;
    }
};

// Computer Choice
const genCompChoice = () => {

    const options = ["rock", "paper", "scissor"];
    const randomIdx = Math.floor(Math.random() * options.length);

    return options[randomIdx];
};

//apply theme-buttons
function applyTheme(theme) {

    document.documentElement.style.setProperty("--bg-color", theme.bg);
    document.documentElement.style.setProperty("--primary-color", theme.primary);
    document.documentElement.style.setProperty("--secondary-color", theme.secondary);
    document.documentElement.style.setProperty("--text-color", theme.text);
    document.documentElement.style.setProperty("--button-color", theme.button);
    document.documentElement.style.setProperty("--button-text", theme.buttonText);

}

//
themeButtons.forEach(button => {
    button.addEventListener("click", () => {
       const themeName = button.dataset.theme;
        applyTheme(themes[themeName]);
    });
});

// Restart Button
restartBtn.addEventListener("click", restartGame);

function restartGame() {
   stopAllSounds();

    userScoreVal = 0;
    compScoreVal = 0;
    gameOver = false;
    currentRound = 1;

    userScore.innerText = 0;
    compScore.innerText = 0;
    roundText.innerText = "Round: 1";

    msg.innerText = "Play your move";
    msg.style.backgroundColor =
    getComputedStyle(document.documentElement)
    .getPropertyValue("--button-color");

    userChoiceText.innerText = "";
    compChoiceText.innerText = "";
}
