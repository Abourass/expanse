// Variables
let health = 1, money = 0, awareness = 0, yPosition = 35, xPosition = 15, currentLocation = 'a dirty alley'; let clockState;
import {User} from './userFunctions';
import {nodeVisToggle, nodeContent} from './gameFunctions';
const player = new User('Player'); // Initiate New User
import {introClick, goRight, goLeft, findingHomeClick, enterHome, createCharacter} from './clickerFunctions';
import {createMap, clearCanvas, createPlayer, deleteScripts, redrawMap} from './mapFunctions';

function healthTimer() {
  if (player.health >= 100) {
    nodeContent('messageUI2', 'In your sleep you hear whispers from something. You strain to hear what they are saying but you can\'t quite make it out. Suddenly, a loud voice says "Are you ready to begin? We will need some information from your first.."');
    nodeVisToggle(['createCharacterButton'], 'hidden');
    stopTimer(clockState);
  } else if (player.health < 100) {
    player.incHealth(5);
    nodeContent('healthUILeveled', player.health);
  }
}

function stopTimer(timerToStop) {
  clearInterval(timerToStop);
}
