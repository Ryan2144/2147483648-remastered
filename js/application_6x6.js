var GM;

// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  GM = new GameManager(6, KeyboardInputManager, HTMLActuator, LocalStorageManager);
});
