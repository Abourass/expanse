import {User} from './userFunctions.mjs';
import {nodeVisToggle, nodeContent} from './gameFunctions.mjs';
Vue.component('stats-bar', {
  data: function() {
    return {
      health: player.health,
      awareness: player.awareness,
      money: player.money,
      name: player.name
    }
  },
  template: `
<div class="stats-bar-component">
  <div id="stats-is-leveled">
    <nav class="level is-mobile">
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Health</p>
          <p id="healthUILeveled" class="title">{{health}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Awareness</p>
          <p id="awarenessUILeveled" class="title">{{awareness}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <img src="../../img/logo.png" alt="">
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading">Money</p>
          <p id="moneyUILeveled" class="title">{{money}}</p>
        </div>
      </div>
      <div class="level-item has-text-centered">
        <div>
          <p class="heading"><a href="../../users/logout">Logout ({{ name }})</a></p>
        </div>
      </div>
    </nav>
  </div>
</div>
`
});

Vue.component('messages-and-map', {
  data: function() {
    return {
      messageArray: 'Hello',
      buttonText: 'Wake Up'
    }
  },
  template: `
  <section id="messageAndMap" class="columns">
  <article id="refinedMessageUI" class="column is-half">
    <div class="columns">
      <div class="column is-full">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              Actions
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <button type="button" onClick="introClick(1)" id="introButton" class="button is-info is-medium">{{buttonText}}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-full">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              The Story So Far..
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              <span id="messageUI2">{{messageArray}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>

  <section id="map" class="hidden nes-container with-title is-centered">
    <p class="title">Map - <span id="locationUILeveled"></span></p>
    <canvas id="canvas" width="400" height="400"></canvas>
  </section>

</section>
  `
});

// Initiate New User
const player = new User('Antonio');

var app = new Vue({
  el: '#app',
  data: {
    message: `Hello ${player.name}`
  }
})
