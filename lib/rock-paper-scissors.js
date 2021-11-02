// Hér þarf að laga þannig að hægt sé að sækja og nota föllin

/**
 * Athugar hvort gefin tala sé gild sem best-of gildi.
 * @param {number} bestOf Tala sem skal athuga
 * @return {boolean} true eða false
 */
function isValidBestOf(bestOf, maxBestOf) {
  // TODO færa úr v7 eða sýnilausn af v7
  if (bestOf % 2 === 0) {
    return false;
  }
  else if (0 < bestOf <= maxBestOf) {
    return true;
  }
  return false;
}
console.assert(isValidBestOf(1) === true, '1 er valid best of');
console.assert(isValidBestOf(2) === false, '2 er ekki er valid best of');
console.assert(isValidBestOf(9) === true, '9 er valid best of');

/**
 * Breytir því sem spilað var úr tölu í texta
 * @param {string} play Hverju var spilað sem tölu
 * @returns Textaheiti þess sem spilað var
 */
function playAsText(play) {
  // TODO færa úr v7 eða sýnilausn af v7
  switch (play) {
    case '1':
      return 'Skæri';
      break;
    case '2':
      return 'Blað';
      break
    case '3':
      return 'Steinn';
      break
    default:
      return 'Óþekkt';
      break;
  }
}
console.assert(playAsText('1') === 'Skæri', '1 táknar skæri');
console.assert(playAsText('2') === 'Blað', '2 táknar blað');
console.assert(playAsText('3') === 'Steinn', '3 táknar steinn');
console.assert(playAsText('foo') === 'Óþekkt', 'Annað er óþekkt');

/**
 * Athugar hvort spilari eða tölva vinnur.
 * @param {number} player Það sem spilari spilaði
 * @param {number} computer Það sem tölva spilaði
 * @returns -1 ef tölva vann, 0 ef jafntefli, 1 ef spilari vann
 */
function checkGame(player, computer) {
  // TODO færa úr v7 eða sýnilausn af v7
  let p = Number(player);
  let c = Number(computer);
  if (p === c) return 0;
  else if (p === 1) {
    if (c === 2) return 1;
    return -1;
  }
  else if (p === 2) {
    if (c === 3) return 1;
    return -1;
  }
  else {
    if (c === 1) return 1;
    return -1;
  }
}
console.assert(checkGame('1', '2') === 1, 'Skæri vinnur blað');
console.assert(checkGame('2', '3') === 1, 'Blað vinnur stein');
console.assert(checkGame('3', '1') === 1, 'Steinn vinnur skæri');
console.assert(checkGame('1', '1') === 0, 'Skæri og skæri eru jafntefli');
console.assert(checkGame('1', '3') === -1, 'Skæri tapar fyrir stein');

/**
 * Spilar fyrir tölvu.
 * Hér væri hægt að taka inn _fyrri_ leiki spilari til að gera tölvu snjallari..
 *
 * @returns {number} Heiltala á bilinu [1, 3]
 */
function computerPlay() {
  return (Math.floor(Math.random() * 3) + 1).toString();
}
