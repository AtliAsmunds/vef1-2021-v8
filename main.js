// TODO hér vantar að sækja viðeigandi föll úr öðrum modules
import { show, createButtons, updateResultScreen, updateGamesScreen } from './lib/ui.js';
import { playAsText, checkGame, computerPlay } from './lib/rock-paper-scissors.js';
/** Hámarks fjöldi best-of leikja, ætti að vera jákvæð heiltala stærri en 0 */
const MAX_BEST_OF = 10;

/** Fjöldi leikja sem á að spila í núverandi umferð */
let totalRounds;

/** Númer umferðar í núverandi umferð */
let currentRound;

/** Sigrar spilara í núverandi umferð */
let playerWins = 0;

/** Töp spilara í núverandi umferð */
let computerWins = 0;

/**
 * Fjöldi sigra spilara í öllum leikjum. Gætum reiknað útfrá `games` en til
 * einföldunar höldum við utan um sérstaklega.
 */
let totalWins = 0;

/**
 * Utanumhald um alla spilaða leiki, hver leikur er geymdur á forminu:
 *
 * ```
 * {
 *   player: 2,
 *   computer: 1,
 *   win: true,
 * }
 * ```
 */
const games = [];

/**
 * Uppfærir stöðu eftir að spilari hefur spilað.
 * Athugar hvort leik sé lokið, uppfærir stöðu skjá með `updateResultScreen`.
 * Birtir annað hvort `Næsti leikur` takka ef leik er lokið eða `Næsta umferð`
 * ef spila þarf fleiri leiki.
 *
 * @param {number} player Það sem spilari spilaði
 */
function playRound(player) {
  let computer = computerPlay();
  let result = checkGame(player, computer);

  if (result > 0) {
    playerWins++;
  }
  else if (result < 0) {
    computerWins++
  }

  updateResultScreen({
    player: player.toString(),
    computer,
    result,
    currentRound,
    totalRounds,
    playerWins,
    computerWins,
  });

  if (result !== 0) {
    currentRound++;
  }


  let next = document.querySelector('button.nextRound');
  let finish = document.querySelector('button.finishGame');


  if (computerWins > totalRounds / 2
    || playerWins > totalRounds / 2
    || currentRound > totalRounds) {
      next.classList.add('hidden');
      finish.classList.remove('hidden');
    }
  else {
    finish.classList.add('hidden');
    next.classList.remove('hidden');
  }

  show('result');
}

/**
 * Fall sem bregst við því þegar smellt er á takka fyrir fjölda umferða
 * @param {Event} e Upplýsingar um atburð
 */
function round(e) {
  totalRounds = Number.parseInt(e.target.innerText);
  currentRound = 1;
  show('play');
}


show('start');

// Takki sem byrjar leik
document
  .querySelector('.start button')
  .addEventListener('click', () => show('rounds'));

// Búum til takka
createButtons(MAX_BEST_OF, round);


// Event listeners fyrir skæri, blað, steinn takka
document
  .querySelector('button.scissor')
  .addEventListener('click', () => playRound(1));

document
  .querySelector('button.paper')
  .addEventListener('click', () => playRound(2));

document
  .querySelector('button.rock')
  .addEventListener('click', () => playRound(3));

/**
 * Uppfærir stöðu yfir alla spilaða leiki þegar leik lýkur.
 * Gerir tilbúið þannig að hægt sé að spila annan leik í framhaldinu.
 */
function finishGame() {
  games.push(
    {
      player: playerWins,
      computer: computerWins,
      win: playerWins > computerWins,
    }
  )

  if (playerWins > computerWins) totalWins++;
  updateGamesScreen(games.length, totalWins, playerWins, computerWins);

  // Núllstillum breytur
  totalRounds = 0;
  currentRound = 0;
  playerWins = 0;
  computerWins = 0;

  // Byrjum nýjan leik!
  show('start');
}

// Næsta umferð og ljúka leik takkar
document.querySelector('button.finishGame').addEventListener('click', finishGame);
document.querySelector('button.nextRound').addEventListener('click', () => show('play'));
