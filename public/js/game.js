let health = 1;

function introClick(number){
  health += number;
  document.getElementById('healthUI').innerHTML = health;
  if (health === 5) {
    document.getElementById('introButton').innerHTML = 'Cough';
  } else if (health === 6 || health === 7) {
    document.getElementById('messageUI').innerHTML = 'Your throat tightens in pain with each cough'
  } else if (health === 8 || health === 9) {
    document.getElementById('messageUI').innerHTML = 'Blood splatters onto the pavement next to your face'
  } else if (health === 10 || health === 11) {
    document.getElementById('introButton').innerHTML = 'Breathe';
    document.getElementById('messageUI').innerHTML = 'You realize your laying on cold concrete, in an alley of some sort. Your head swims..'
  }
}
