import { GameManager } from "./GameManager"
import { GameObject } from "./GameObject";
import { Unit } from "./Unit";

export class Player {
	private static instance: Player;
	private gameManager: GameManager;
	clickBuffer: number = 8;

	// @ts-ignore for now
	private selected: GameObject | undefined;
	constructor() {
		this.initListeners();
		this.gameManager = GameManager.getInstance();
	}

	select(x: number, y: number) {
		let gameObjects = this.gameManager.getGameObjects();
		let gameObject = gameObjects.find(gameObject => gameObject.containsPoint(x, y) && gameObject instanceof Unit);
		if(gameObject) {
			this.selected = gameObject;
			if(gameObject instanceof Unit) {
				gameObject.select();
				this.selected = gameObject;
			}
		}
	}

	deselect() {
		if(this.selected && this.selected instanceof Unit) {
			this.selected.deselect();
		}
		this.selected = undefined;
	}

	command(x: number, y: number) {
		if(this.selected instanceof Unit) {
			this.selected.setTargetPosition(x, y);		
		}
	};

	private initListeners() {
		window.addEventListener("mousedown", (event) => {
			const x = event.clientX - this.clickBuffer;
			const y = event.clientY - this.clickBuffer;
			if(this.selected === undefined) {
				Player.instance.select(x, y);
			} else {
				this.command(x, y);	
			}
			//this.gameManager.addGameObject(new Unit(x, y, 1, 0, "black"));
		});

		window.addEventListener("mouseup", (_event) => {
			console.log("mouseup");
		});

		window.addEventListener("keydown", (event) => {
			if(event.key == "Escape") {
				this.deselect();
			}
		});
	}
	
	public static getInstance(): Player {
		if(!Player.instance) {
			Player.instance = new Player();
		}
		return Player.instance;
	}


}
