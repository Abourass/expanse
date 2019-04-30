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

// Variables
let health = 1, money = 0, currentLocation = 'A Dirty Alley';

function introClick(number){
  health += number;
  document.getElementById('healthUI').innerHTML = health;
  if (health === 5) {
    document.getElementById('introButton').innerHTML = 'Cough';
  } else if (health === 6 || health === 7) {
    document.getElementById('messageUI').innerHTML = 'Your throat tightens in pain with each cough'
  } else if (health === 8 || health === 9) {
    document.getElementById('messageUI').innerHTML = 'Blood splatters onto the pavement next to your face'
  } else if (health === 10 ) {
    document.getElementById('introButton').innerHTML = 'Breathe';
    document.getElementById('messageUI').innerHTML = "You realize you're laying on cold concrete, in an alley of some sort. Your head swims..";
  } else if ( health === 15) {
    let toggleNodeArray = ['introButton', 'findingHomeButton', 'moneyUIDesc', 'locationUI', 'statPadding', 'map'];
    nodeVisToggle(toggleNodeArray, 'hidden');
    document.getElementById('messageUI').innerHTML = "You sit up and try to remember what happened.. or to remember anything at all. What happened, who am I?!?";
    try {
      magicMap.appendChild(document.createTextNode(magicMapContents));
      document.body.appendChild(magicMap);
    } catch(err) {
      magicMap.text = magicMapContents;
      document.body.appendChild(magicMap)
    }
  }
}

function findingHomeClick(number){

}

// Map Script
const magicMap = document.createElement('script');
magicMap.type = 'text/javascript';
let magicMapContents = `const rc = rough.canvas(document.getElementById('canvas'));
//line and rectangle
rc.rectangle(140, 10, 100, 100, {
  fill: 'rgba(38, 38, 54, 0.97)',
  fillStyle: 'solid',
  roughness: 2
});`;
