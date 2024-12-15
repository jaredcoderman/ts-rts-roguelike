import { GameManager } from "./GameManager"
import { GameObject } from "./GameObject";

export class Player {
	private static instance: Player;
	private gameManager: GameManager;
	// @ts-ignore for now
	private selected: GameObject;
	constructor() {
		this.initListeners();
		this.gameManager = GameManager.getInstance();
	}

	select(x: number, y: number) {
		let gameObjects = this.gameManager.getGameObjects();
		let gameObject = gameObjects.find(gameObject => gameObject.containsPoint(x,y));
		if(gameObject) {
			this.selected = gameObject;
		}
	}

	private initListeners() {
		window.addEventListener("mousedown", (event) => {
			const x = event.clientX;
			const y = event.clientY;
			this.select(x, y);
		});

		window.addEventListener("mouseup", (_event) => {
			console.log("mouseup");
		});
	}
	
	public static getInstance(): Player {
		if(!Player.instance) {
			Player.instance = new Player();
		}
		return Player.instance;
	}


}
