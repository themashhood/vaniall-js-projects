//Variables
let counter = 0;
let intervalID = null;

// //DOM 
let startBtn = document.querySelector("#start")
let stopbtn = document.querySelector("#stop");
let resetBtn = document.querySelector("#reset") 
let mainDisplay = document.querySelector(".mainDisplay");
mainDisplay.textContent = counter;


function startFunc() {
   intervalID ??= setInterval(() =>{
    counter++;
    mainDisplay.textContent = counter;
    console.log(counter)
   }, 1000)
};

function stopFunc(){
    clearInterval(intervalID)
    intervalID = null;
    mainDisplay.textContent = counter;
}

function reset(){
    clearInterval(intervalID)
    intervalID = null;
    counter = 0;
    mainDisplay.textContent = counter;
}

//Eventlistners 
startBtn.addEventListener("click", startFunc) 
stopbtn.addEventListener("click", stopFunc)
resetBtn.addEventListener("click", reset)