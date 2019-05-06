// Variables
let health = 100, money = 0, awareness = 10, currentLocation = 'at home';

// User Class
export class User {
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

  setLocation(value) {
    this.location = value;
  }
}
