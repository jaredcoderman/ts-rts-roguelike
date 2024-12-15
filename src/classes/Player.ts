import { Vector2 } from "../utils/Vector";
import { Collector } from "./Collector";
import { GameManager } from "./GameManager"
import { GameObject } from "./GameObject";
import { Structure } from "./Structure";
import { Tile } from "./Tile";
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

	select(point: Vector2) {
		let gameObjects = this.gameManager.getGameObjects();
		let gameObject = gameObjects.find(gameObject => gameObject.containsPoint(point) && !(gameObject instanceof Tile));
		if(gameObject instanceof Unit || gameObject instanceof Structure) {
			this.selected = gameObject;
			gameObject.select();
		}
	}

	deselect() {
		if(this.selected && (this.selected instanceof Unit || this.selected instanceof Structure)) {
			this.selected.deselect();
		}
		this.selected = undefined;
	}

	command(point: Vector2) {
		if(this.selected instanceof Collector) {
			let resource = this.gameManager.queryResources(point);			
			if(resource) {
				this.selected.collect(resource);
			} else {
				this.selected.setTargetPosition(point);
			}
		} else if(this.selected instanceof Unit ) {
			this.selected.setTargetPosition(point);		
		}
	};

	private initListeners() {
		window.addEventListener("mousedown", (event) => {
			const x = event.clientX - this.clickBuffer;
			const y = event.clientY - this.clickBuffer;
			const point = new Vector2(x, y);
			if(this.selected === undefined) {
				Player.instance.select(point);
			} else {
				this.command(point);	
			}
			//this.gameManager.addGameObject(new Unit(x, y, 1, 0, "black"));
		});

		window.addEventListener("mouseup", (_event) => {
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
