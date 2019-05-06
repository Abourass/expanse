import {User} from './userFunctions.mjs';
import {nodeVisToggle, nodeContent} from './gameFunctions.mjs';

// Initiate New User
const player = new User();

var app = new Vue({
  el: '#app',
  data: {
    message: `Hello ${player.name}`
  }
})
