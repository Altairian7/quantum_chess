import { Chess } from 'chess.js';

let gameInstance = null;

export function initGame() {
  gameInstance = new Chess();
  return gameInstance;
}

export function getGame() {
  return gameInstance;
}
