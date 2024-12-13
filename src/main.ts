import { GameManager } from "./classes/GameManager"

const canvas = document.getElementById("game") as HTMLCanvasElement;
if(canvas) {
	const gameManager = GameManager.getInstance(canvas);
	gameManager.init();
}
