function getSize() { 
  var reg = new RegExp("(^|&)size=([^&]*)(&|$)", "i");
  var r = location.search.substr(1).match(reg);
  if (r != null) {
    return parseInt(unescape(decodeURI(r[2])));
  }
  return 16; 
}
var game;
window.requestAnimationFrame(function () {
  var size = getSize();
  var container = document.getElementById('grid-container');
  var html = '';
  for (var i = 0; i < size; ++i) {
    html += '<div class="grid-row">';
    for (var j = 0; j < size; ++j) {
      html += '<div class="grid-cell"></div>';
    }
    html += '</div>';
  }
  container.innerHTML = html;
  game = new GameManager(size, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  var mode = getMode();
});

var last = '';
var dir = 0;
var cnt = 0;

var mover = undefined;

function doMovementPattern(moveType) {
  mover = setInterval(moveType, 1);
}

function stopMovement() {
  mover = clearInterval(mover);
}

function corner() {
  if (game == null || typeof(game) === "undefined") {
    return;
  }
  var item = document.getElementById('tile-container');
  if (item.innerHTML == last) {
    if (++cnt > 1) {
      dir = 1 - dir;
      cnt = 0;
    }
  }
  last = item.innerHTML;
  if (0 === dir) {
    game.move(0);
    game.move(3);
  } else {
    game.move(0);
    game.move(1);
  }
}

function swing() {
  if (game == null || typeof(game) === "undefined") {
    return;
  }
  var item = document.getElementById('tile-container');
  if (item.innerHTML == last) {
    if (++cnt > 1) {
      dir = 1 - dir;
      cnt = 0;
    }
  }
  last = item.innerHTML;
  if (0 === dir) {
    game.move(0);
    game.move(2);
  } else {
    game.move(1);
    game.move(3);
  }
}

function swirl() {
  dir = (dir + 1) % 4;
  game.move(dir);
}

function random() {
  game.move(Math.floor(Math.random() * 4));
}

function changeSize(size) {
  window.location.href = 'merge3.html?size=' + size;
}
