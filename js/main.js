//DOM
const wordInput = document.querySelector(".word-input");
const wordDisplay = document.querySelector(".word-display");
const scoreDisplay = document.querySelector(".score");
const timeDisplay = document.querySelector(".time");
const button = document.querySelector(".button");

//variables
const GAME_TIME = 6;
let score = 0;
let time = 9;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];

//functions
init();

function init(){
    buttonChanger("Loading");
    getWords();
    wordInput.addEventListener("input", checkMatch);
}
function run(){
    if(isPlaying){
        return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    score = 0
    scoreDisplay.innerText = score;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 500);
    buttonChanger("Progress");
}

function checkStatus(){
    if(!isPlaying && time === 0){
        buttonChanger("Start");
        clearInterval(checkInterval);
    }
}
function getWords(){
    axios.get('https://random-word-api.herokuapp.com/word?number=500')
        .then(function (response) {
            // handle success
            response.data.forEach((word) => {
                if(word.length < 10){
                    words.push(word);
                }
            })
            buttonChanger("Start");
            console.log(words);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
        });
}

function buttonChanger(text){
    button.innerText = text;
    text === "Start" ? button.classList.remove("loading") : button.classList.add("loading")
}


function countDown(){
    time > 0 ? time-- : isPlaying = false;
    if(!isPlaying){
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}

function checkMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerHTML.toLowerCase()){
        wordInput.value = "";
        if(!isPlaying){
            return
        }
        score++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random()*words.length);
        wordDisplay.innerText = words[randomIndex];
    }
}

//event handler
