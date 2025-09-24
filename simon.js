let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "yellow", "purple"];

let start = false;
let level = 0;

let highestLevel = 0;

// Step1: Start game on any key press
document.getElementById("startGame").addEventListener("click", () => {
    if (!start) {
        console.log('game is started');
        start = true;
        level =0;
        gameSeq =[];
        userSeq =[];

        levelUp();
    }
});

// flash a button for the game sequence:
function gameflash(btn) {
    // first add flash class
    btn.classList.add("flash");
    // remove flash class after some time
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// flash effect occurs when user clicks
function userflash(btn) {
    // first add flash class
    btn.classList.add("userflash");
    // remove flash class after some time
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 300);
}

function levelUp() {

    userSeq = [];
    level++;
    let h2 = document.querySelector("h2");
    h2.innerText = `Level ${level}`;

    // choose any random button 
    let randomIndex = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIndex];

    // selecting (button class(randomColor class) like .red, .green, .yellow etc)
    let randomBtn = document.querySelector(`.${randomColor}`);
    // let randomBtn = document.querySelector('.'+randomColor);

    // push random color to gamesequence:
    gameSeq.push(randomColor);
    console.log(gameSeq);

    // flash the random button 
    gameflash(randomBtn);
}

// checking user Sequence:
function checkAns(index) {
    if (userSeq[index] === gameSeq[index]) {
        // if we are in middle of any sequence then do nothing
        // but 
        // if user seq & game seq length is equal then 
        if (userSeq.length === gameSeq.length) {
            // giving delay when we level up
            setTimeout(levelUp, 1000);
        }
    } else {
        let h2 = document.querySelector("h2");
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press Start to Play Again:`;

        let body = document.querySelector('body');
        body.classList.add('body');
        // body.style.backgroundColor = 'Red';
        setTimeout(function () {
            body.classList.remove("body");
        }, 500)

        // printing the highest score 
        if (level > highestLevel) {
            highestLevel = level;
        }

        let highScore = document.getElementById('highscore');
        highScore.innerText = `Highest Level : ${highestLevel}`;
        reset();
    }
}

// // user press any button
// function btnPress() {
    
//     userflash(this);
//     // generating and adding user Enter color
//     userColor = this.getAttribute("id");
//     userSeq.push(userColor);

//     checkAns(userSeq.length - 1); // last index of user sequence
// }

// let allBtns = document.querySelectorAll('.btn');
// for (btn of allBtns) {
//     btn.addEventListener('click', btnPress)
// }

// 5️⃣ Handle user button clicks
document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function () {
        if (!start) return; // ignore clicks if game not started
        userflash(this);
        let userColor = this.id;
        userSeq.push(userColor);
        checkAns(userSeq.length - 1);
    });
});


// reset the game (when we enter wrong sequence):
function reset() {

    start = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}



