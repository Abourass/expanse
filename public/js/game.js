// Time Saving Functions
function nodeVisToggle(toggleNode, className) {
  if (Array.isArray(toggleNode)) {
    for (let step = 0; step < toggleNode.length; step++) {
      document.getElementById(`${toggleNode[step]}`).classList.toggle(`${className}`);
    }
  } else {
    document.getElementById(`${toggleNode}`).classList.toggle(`${className}`);
  }
}

function nodeContent(selectedNode, content) {
  document.getElementById(`${selectedNode}`).innerHTML = `${content}`;
}

// Variables
let health = 1, money = 0, awareness = 0, yPosition = 35, xPosition = 15, currentLocation = 'a dirty alley';

class User {
  constructor(name) {
    // invokes the setter
    this._name = name;
    this._health = health;
    this._money = money;
    this._awareness = awareness;
    this._location = currentLocation;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 2){
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  get health() {
    return this._health;
  }

  set health(value) {
    this._health = value;
  }

  incHealth(clickValue) {
    this.health += clickValue;
  }

  subHealth(clickValue) {
    this.health -= clickValue;
  }

  get money() {
    return this._money;
  }

  set money(value) {
    this._money = value;
  }

  incMoney(clickValue) {
    this.money += clickValue;
  }

  subMoney(clickValue) {
    this.money -= clickValue;
  }

  get awareness() {
    return this._awareness;
  }

  set awareness(value) {
    this._awareness = value;
  }

  incAwareness(clickValue) {
    this.awareness += clickValue;
  }

  subAwareness(clickValue) {
    this.awareness -= clickValue;
  }

  get location() {
    return this._location;
  }

  set location(value) {
    this._location = value;
  }
}

const player = new User('Player');

function introClick(clickValue){
  player.incHealth(clickValue);
  nodeContent('healthUI', player.health);
  if (player.health === 5) {
    nodeContent('introButton', 'Cough');
  } else if (player.health === 6 || player.health === 7) {
    nodeContent('messageUI', 'Your throat tightens painfully with each cough.');
  } else if (player.health === 8 || player.health === 9) {
    nodeContent('messageUI', 'A particularly hard cough leaves blood on the pavement next to your face. You are acutely aware of how raw your throat is. ');
  } else if (player.health === 10 ) {
    nodeContent('introButton', 'Breathe');
    nodeContent('messageUI', 'You realize you\'re laying on cold concrete, in an alley of some sort. Your head swims..');
  } else if ( player.health === 15) {
    let toggleNodeArray = ['introButton', 'findingHomeButton', 'moneyUIDesc', 'locationUIDesc', 'statPadding', 'map'];
    nodeVisToggle(toggleNodeArray, 'hidden');
    nodeContent('messageUI', 'You sit up and try to remember what happened.. or to remember anything at all. What happened, Why am I here, who am I?!?');
    nodeContent('moneyUI', player.money);
    nodeContent('locationUI', player.location);
    createMap();
    createPlayer(0, 0);
  }
}

function findingHomeClick(clickValue){
  if (player.awareness <= 16) {
    player.incAwareness(clickValue);
    yPosition += clickValue / 4;
    xPosition += clickValue * 4;
    clearCanvas();
    createMap();
    redrawMap();
    createPlayer(yPosition, xPosition);
  } else if ( player.awareness >= 17 && player.awareness <= 20) {
    nodeContent('messageUI', 'Having limped to the end of the alley you\'ve made it to street. Where to now?');
    player.incAwareness(clickValue);
    yPosition += clickValue / 4;
    xPosition += clickValue * 4;
    clearCanvas();
    createMap();
    redrawMap();
    createPlayer(yPosition, xPosition);
  } else if ( player.awareness >= 21) {
    nodeContent('messageUI', 'Having limped to the end of the alley you\'ve made it to street. Where to now?')
  }
}

// Map Script
function createMap() {
  if (document.getElementById('mapBase')){
    document.getElementById('mapBase').remove();
  }
  const magicMapBase = document.createElement('script');
  magicMapBase.type = 'text/javascript';
  magicMapBase.id = 'mapBase';
  let magicMapHeader = `const rc = rough.canvas(document.getElementById('canvas'));

`;
  let magicMapPlaces = `// Map Below
rc.rectangle(70, 10, 10, 100, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});
rc.rectangle(10, 10, 10, 100, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});
rc.rectangle(10, 0, 70, 10, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});

`;
  try {
    magicMapBase.appendChild(document.createTextNode(magicMapHeader));
    magicMapBase.appendChild(document.createTextNode(magicMapPlaces));
    document.body.appendChild(magicMapBase);
  } catch(err) {
    magicMapBase.text = magicMapHeader + magicMapPlaces;
    document.body.appendChild(magicMapBase);
  }
}

// Redraw Map Script
function redrawMap() {
  if (document.getElementById('mapRedraw')){
    document.getElementById('mapRedraw').remove();
  }
  const magicMapRedraw = document.createElement('script');
  magicMapRedraw.type = 'text/javascript';
  magicMapRedraw.id = 'mapRedraw';

  let magicMapPlaces = `// Map Below
rc.rectangle(70, 10, 10, 100, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});
rc.rectangle(10, 10, 10, 100, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});
rc.rectangle(10, 0, 70, 10, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});

`;
  try {
    magicMapRedraw.appendChild(document.createTextNode(magicMapPlaces));
    document.body.appendChild(magicMapRedraw);
  } catch(err) {
    magicMapRedraw.text = magicMapPlaces;
    document.body.appendChild(magicMapRedraw);
  }
}

function createPlayer(yPosition, xPosition) {
  // Map Script - Player Icon
  if (document.getElementById('mapPlayerScript')){
    document.getElementById('mapPlayerScript').remove();
  }
  const magicMapPlayer = document.createElement('script');
  magicMapPlayer.type = 'text/javascript';
  magicMapPlayer.id = 'mapPlayerScript';
  let mapPlayer = `
rc.circle(${yPosition}, ${xPosition}, 20, {
  fill: "rgb(10, 150, 10)",
  fillWeight: 1,
  fillStyle: 'cross-hatch',
  roughness: 2
});`;
  try {
    magicMapPlayer.appendChild(document.createTextNode(mapPlayer));
    document.body.appendChild(magicMapPlayer);
  } catch(err) {
    magicMapPlayer.text = mapPlayer;
    document.body.appendChild(magicMapPlayer);
  }
}

function clearCanvas() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
}
