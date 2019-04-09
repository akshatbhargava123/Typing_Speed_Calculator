function Timer(range = 100) {
  this._currentTime = 0;
  this._range = range;
  this._interval = null;
}

Timer.prototype.start = function() {
  this._interval = setInterval(() => this._currentTime += this._range, this._range);
}

Timer.prototype.stop = function() {
  clearInterval(this._interval);
  const time = this._currentTime;
  this._currentTime = 0;
  return time;
}