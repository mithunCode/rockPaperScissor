let rulebtn = document.querySelector(".ruleBoard");
let closebtn = document.querySelector(".closebtn");
let mainGame = document.querySelector(".mainGame");
let pScore = document.querySelector(".pScore");
let cScore = document.querySelector(".cScore");
let playerScore = parseInt(localStorage.getItem("pScore")) || 0;
let computerScore = parseInt(localStorage.getItem("cScore")) || 0;
let btnContainer = document.querySelector(".btnContainer");
let rulesbtn = document.querySelector(".rulebtn");
let scoreContainer = document.querySelector(".scoreContainer");
let resultRow = document.querySelector(".resultRow");
let victoryPage = document.querySelector(".victoryPage");
let gameRow = document.querySelector(".gameRow");
let next = document.querySelector(".next");
let nextBtn = document.querySelector(".nextBtn");
let playerWin = document.querySelector(".playerWin");
let pcWin = document.querySelector(".pcWin");

let winMessage = "";

const computerArray = ["rock", "paper", "scissor"];

rulebtn.style.display = "none";

function setScore() {
  pScore.innerHTML = playerScore;
  cScore.innerHTML = computerScore;
}
setScore();

function closeBtn() {
  rulebtn.style.display = "none";
}

function handleRules() {
  if (rulebtn.style.display === "none") {
    rulebtn.style.display = "block";
  } else {
    rulebtn.style.display = "none";
  }
}

function playAgain() {
  setScore();
  rulebtn.style.display = "none";
  location.reload();
}

function winnerMessage(res) {
  winMessage =
    `<div class='winmsg'><h3> YOU ` +
    `${res}` +
    `</h3> <p>AGAINST PC</p><button class='playAgainBtn' onclick="playAgain()" > Play Again</button></div>`;
}

const victory = () => {
  scoreContainer.style.display = "none";
  mainGame.style.display = "none";
  victoryPage.style.display = "block";
  next.style.display = "none";
};

function handleSelect(value) {
  gameRow.style.display = "none";
  var winner = false;
  let playerChoice = value;
  let computerChoice =
    computerArray[Math.floor(Math.random() * computerArray.length)];

  if (playerChoice === computerChoice) {
    winMessage = `<div class='winmsg'><h3> TIE UP</h3> 
    <button class='playAgainBtn '  onclick="playAgain()">REPLAY</button>
    </div>`;
  } else if (
    (playerChoice === "rock" && computerChoice === "scissor") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissor" && computerChoice === "paper")
  ) {
    playerScore += 1;
    winner = true;
    localStorage.setItem("pScore", playerScore);
    pScore.innerHTML = playerScore;
    winnerMessage("WIN");
    rulesbtn.style.right = "15%";
    next.insertAdjacentHTML(
      "beforeEnd",
      `<button class="nextBtn" onClick="victory()">NEXT</button>`
    );
  } else {
    computerScore += 1;
    winner = true;
    localStorage.setItem("cScore", computerScore);
    cScore.innerHTML = computerScore;
    winnerMessage("LOST");
  }
  let playerSrc = `/assets/${playerChoice}` + ".png";
  let computerSrc = `/assets/${computerChoice}` + ".png";

  let resultDiv = `
  <div class="resultRow">
        <div class="resultHead">
          <p>You Picked</p>
          <p>Computer Picked</p>
        </div>
        <div class="resultShow">
        <div class="${winner} ? 'green1' : none ">
          <div class="${playerChoice}Select " >
            <img src="${playerSrc}" alt="" />
          </div>
          </div>
         ${winMessage}
         <div class="${winner}? 'green1' : ''"> 
          <div class="${computerChoice}Select ">
          <img src="${computerSrc}" alt="" />
          </div>
          </div>
        </div>
      </div>
  `;
  gameRow.insertAdjacentHTML("AfterEnd", resultDiv);
}
