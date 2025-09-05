// 1. Load score from localStorage or start fresh
let score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Losses: 0,
  Ties: 0
};

updateScoreElement(); // show score on page load

// 2. Function to update score display
function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.Wins}, Losses: ${score.Losses} and Ties: ${score.Ties}`;
}

// 3. Auto Play logic
let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalID = setInterval(function () {
      const playerMove = pickCompMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalID);
    isAutoPlaying = false;
  }
}

//Event Listeners
document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r'){
      playGame('Rock')
    } else if(event.key === 'p'){
      playGame('Paper')
    } else if (event.key === 's'){
      playGame('Scissors')
    } else if(event.key === 'a'){
      autoPlay()
    } else if(event.key === 'e'){
      score.Wins = 0;
      score.Losses = 0;
      score.Ties = 0;
      localStorage.removeItem('score')
      updateScoreElement()
    }
});

document.querySelector('.js-rock-button ')
.addEventListener('click', () => {
  playGame('Rock')
});

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
  playGame('Paper')
});

document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
  playGame('Scissors')
});

document.querySelector('.js-reset-button')
.addEventListener('click', () => {
  score.Wins = 0;
      score.Losses = 0;
      score.Ties = 0;
      localStorage.removeItem('score')
      updateScoreElement()
});

document.querySelector('.js-auto-button')
.addEventListener('click', () => {
  autoPlay()
});

// 4. Main game function
function playGame(playerMove) {
  const compMove = pickCompMove();
  let result = '';

  // Game logic
  if (playerMove === 'Scissors') {
    if (compMove === 'Rock') {
      result = 'You Lose.';
    } else if (compMove === 'Paper') {
      result = 'You Win.';
    } else {
      result = 'Tie.';
    }
  } else if (playerMove === 'Paper') {
    if (compMove === 'Rock') {
      result = 'You Win.';
    } else if (compMove === 'Paper') {
      result = 'Tie.';
    } else {
      result = 'You Lose.';
    }
  } else if (playerMove === 'Rock') {
    if (compMove === 'Rock') {
      result = 'Tie.';
    } else if (compMove === 'Paper') {
      result = 'You Lose.';
    } else {
      result = 'You Win.';
    }
  }

  // Update score
  if (result === 'You Win.') {
    score.Wins += 1;
  } else if (result === 'You Lose.') {
    score.Losses += 1;
  } else if (result === 'Tie.') {
    score.Ties += 1;
  }

  // Save and update UI
  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();

  // Update result text
  document.querySelector('.js-result').innerHTML = result;

  // Update moves
  document.querySelector('.js-moves').innerHTML = `
    You <img src="img/${playerMove}-emoji.png" class="move-icon">
    <img src="img/${compMove}-emoji.png" class="move-icon"> Computer
  `;
}

// 5. Computer randomly picks move
function pickCompMove() {
  const randomNum = Math.random();

  if (randomNum < 1 / 3) {
    return 'Rock';
  } else if (randomNum < 2 / 3) {
    return 'Paper';
  } else {
    return 'Scissors';
  }
}
