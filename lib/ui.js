import { el } from "./helpers.js";
import { isValidBestOf, playAsText } from "./rock-paper-scissors.js";

/**
 * Býr til takka fyrir umferðir, festir `onClick` við og bætir
 * við `.rounds__buttons`.
 *
 * @param {number} max Hámark umferða
 * @param {function} onClick Fall sem keyra skal þegar ýtt er á takka
 */
export function createButtons(max, onClick) {
  const rounds = document.querySelector(".rounds__buttons");

  for (let i = 1; i < max; i++) {
    if (isValidBestOf(i, max)) {
      const button = el("button", `${i}`);
      button.addEventListener("click", onClick);
      button.classList.add("button");
      rounds.appendChild(button);
    }
  }
}

export function show(part) {
  // Element fyrir „parta“ leiks sem við viljum fela og sýna
  const start = document.querySelector(".start");
  const rounds = document.querySelector(".rounds");
  const play = document.querySelector(".play");
  const result = document.querySelector(".result");

  // Felum allt
  start.classList.add("hidden");
  rounds.classList.add("hidden");
  play.classList.add("hidden");
  result.classList.add("hidden");

  // og sýnum það sem beðið er um
  switch (part) {
    case "start":
      start.classList.remove("hidden");
      break;
    case "rounds":
      rounds.classList.remove("hidden");
      break;
    case "play":
      play.classList.remove("hidden");
      break;
    case "result":
      result.classList.remove("hidden");
      break;
    default:
      console.warn(`${part} óþekkt`);
  }
}

/**
 * @typedef {Object} Results
 * @property {string} player Það sem spilari spilaði
 * @property {string} computer Það sem tölva spilaði
 * @property {number} result Útkoma úr leik, `-1`, `0`, eða `1`
 * @property {number} currentRound Núverandi umferð
 * @property {number} totalRounds Heildarfjöldi umferð
 * @property {number} playerWins Sigrar spilara í umferð
 * @property {number} computerWins Sigrar tölvu í umferð
 */

/**
 * Uppfærir öll gildi stöðu skjás innan `.result` áður en sýndur.
 * @param {Results} r Gildi fyrir skjá
 */
export function updateResultScreen({
  player,
  computer,
  result,
  currentRound,
  totalRounds,
  playerWins,
  computerWins,
}) {
  const resultPlayer = document.querySelector(".result__player");
  const resultComp = document.querySelector(".result__computer");
  const total = document.querySelector(".result__totalRounds");
  const current = document.querySelector(".result__currentRound");
  const playResult = document.querySelector(".result__result");
  const resultStatus = document.querySelector(".result__status");

  if (result > 0) playResult.textContent = "Þú sigraðir!";
  else if (result < 0) playResult.textContent = "Tölva sigrar.";
  else playResult.textContent = "Jafntefli";

  resultPlayer.textContent = playAsText(player);
  resultComp.textContent = playAsText(computer);
  total.textContent = totalRounds.toString();
  current.textContent = currentRound.toString();
  resultStatus.textContent = `Staðan er: ${playerWins}-${computerWins}`;
}

export function updateGamesScreen(totalGames, totalWins, player, computer) {
  const wins = document.querySelector(".games__wins");
  const winRatio = document.querySelector(".games__winratio");
  const losses = document.querySelector(".games__losses");
  const lossRatio = document.querySelector(".games__lossratio");
  const played = document.querySelector(".games__played");

  wins.textContent = totalWins.toString();
  losses.textContent = `${totalGames - totalWins}`;
  winRatio.textContent = `${((totalWins / totalGames) * 100).toFixed(2)}`;
  lossRatio.textContent = `${(
    ((totalGames - totalWins) / totalGames) *
    100
  ).toFixed(2)}`;
  played.textContent = totalGames.toString();

  const gamesList = document.querySelector(".games__list");

  let text;
  if (player > computer) text = `Þú vannst ${player}-${computer}`;
  else text = `Tölvan vann ${player}-${computer}`;

  const listItem = el("li", text);
  gamesList.appendChild(listItem);
}
