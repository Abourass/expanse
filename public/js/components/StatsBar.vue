export default {
  Vue.component('StatsBar', {
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
}
