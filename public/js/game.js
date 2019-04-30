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
let health = 1, money = 0, currentLocation = 'a dirty alley', awareness = 0;

// Map Script - Player Icon
const magicMapPlayer = document.createElement('script');
magicMapPlayer.type = 'text/javascript';
magicMapPlayer.id = 'mapPlayer';
let xPosition = 15;
let yPosition = 35;
let mapPlayer = `
rc.circle(${yPosition}, ${xPosition}, 20, {
  fill: "rgb(10, 150, 10)",
  fillWeight: 1,
  fillStyle: 'cross-hatch',
  roughness: 2
});`;


function introClick(number){
  health += number;
  nodeContent('healthUI', health);
  if (health === 5) {
    nodeContent('introButton', 'Cough');
  } else if (health === 6 || health === 7) {
    nodeContent('messageUI', 'Your throat tightens painfully with each cough.');
  } else if (health === 8 || health === 9) {
    nodeContent('messageUI', 'A particularly hard cough leaves blood on the pavement next to your face. You are acutely aware of how raw your throat is. ');
  } else if (health === 10 ) {
    nodeContent('introButton', 'Breathe');
    nodeContent('messageUI', 'You realize you\'re laying on cold concrete, in an alley of some sort. Your head swims..');
  } else if ( health === 15) {
    let toggleNodeArray = ['introButton', 'findingHomeButton', 'moneyUIDesc', 'locationUIDesc', 'statPadding', 'map'];
    nodeVisToggle(toggleNodeArray, 'hidden');
    nodeContent('messageUI', 'You sit up and try to remember what happened.. or to remember anything at all. What happened, Why am I here, who am I?!?');
    nodeContent('moneyUI', money);
    nodeContent('locationUI', currentLocation);
    try {
      magicMapBase.appendChild(document.createTextNode(magicMapHeader));
      magicMapBase.appendChild(document.createTextNode(magicMapPlaces));
      document.body.appendChild(magicMapBase);
      magicMapPlayer.appendChild(document.createTextNode(mapPlayer));
      document.body.appendChild(magicMapPlayer);
    } catch(err) {
      magicMapBase.text = magicMapHeader + magicMapPlaces;
      document.body.appendChild(magicMapBase);
      magicMapPlayer.text = mapPlayer;
      document.body.appendChild(magicMapPlayer);
    }
  }
}

function findingHomeClick(number){
  awareness += number;
  document.getElementById('mapPlayer').remove();
  yPosition += number;
  xPosition += number;
  try {
    magicMapPlayer.appendChild(document.createTextNode(mapPlayer));
    document.body.appendChild(magicMapPlayer);
  } catch(err) {
    magicMapPlayer.text = mapPlayer;
    document.body.appendChild(magicMapPlayer);
  }
}

// Map Script
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
