import { GameObject } from "./GameObject";
import { Grid } from "./Grid"
import { Player } from "./Player";
import { Resource } from "./Resource";
import { Vector2 } from "../utils/Vector";
import { Collector } from "./Collector";
import { Base } from "./Base";
import { UIManager } from "./UIManager";
import { SpriteLoader } from "./SpriteLoader";

export class GameManager {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private gameObjects: GameObject[];
	private lastTimeStamp: number;
	public static instance: GameManager;
	private cellSize: number = 20;
	private spriteLoader: SpriteLoader;
	grid: Grid | undefined;
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d")!;
		this.lastTimeStamp = 0;
		this.gameObjects = [];
		this.spriteLoader = new SpriteLoader();
	}

	public static getInstance(canvas?: HTMLCanvasElement): GameManager {
		if (!GameManager.instance) {
			if (!canvas) {
				throw new Error("Canvas must be provided upon GameManager instance creation");
			}
			GameManager.instance = new GameManager(canvas);
		}
		return GameManager.instance;
	}	

	public async init() {
		// Set the size
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight
		// Create the grid
		let rows = Math.floor(this.canvas.width / this.cellSize);
		let cols = Math.floor(this.canvas.height / this.cellSize);
		this.grid = new Grid(rows, cols, this.cellSize);	
		this.grid.drawGrid();

		// Load sprites
		const spriteUrls = [
			"Tiles/collector.png",
			"Tiles/base.png",
			"Tiles/resource.png"
		];

		await this.spriteLoader.loadSprites(spriteUrls);

		// Make units
		let u = new Collector(300, 500, 20, 100, "Tiles/collector.png", 3);
		let u2 = new Collector(200, 200, 20, 100, "Tiles/collector.png", 3);
		let u3 = new Collector(210, 210, 20, 100, "Tiles/collector.png", 3);
		let b = new Base(80, 80, 40, "Tiles/base.png", 100);
		
		let r = new Resource(400, 500, 20, "Tiles/resource.png", 20, 20);
		let r2 = new Resource(400, 520, 20, "Tiles/resource.png", 20, 20);
		let r3 = new Resource(420, 500, 20, "Tiles/resource.png", 20, 20);
		let r4 = new Resource(400, 540, 20, "Tiles/resource.png", 20, 20);
		let r5 = new Resource(440, 560, 20, "Tiles/resource.png", 20, 20);
		let r6 = new Resource(420, 540, 20, "Tiles/resource.png", 20, 20);
		this.addGameObjects([u, u2, u3, b, r, r2, r3, r4, r5, r6]);
	
		// Init UI
		UIManager.getInstance();

		// Init player
		Player.getInstance();
		
		// request animation frame here
		requestAnimationFrame(this.loop.bind(this));
	}

	findClosestOfType<T extends GameObject>(
		obj: GameObject,
		type: new (...args: any[]) => T): GameObject | void {
		const objectsOfType = this.gameObjects.filter(gameObject => gameObject instanceof type);
		let closestDistance = Infinity;
		let closestObj = objectsOfType[0];
		objectsOfType.forEach(object => {
			if(obj.distanceTo(object) < closestDistance) {
				closestDistance = obj.distanceTo(object);
				closestObj = object;
			}
		});
		return closestObj;
	}

	queryResources(point: Vector2): Resource | undefined {	
		const resources = this.gameObjects.filter(gameObject => gameObject instanceof Resource);
		let resourceOnPoint = resources.find(resource => resource.containsPoint(point) && resource.available);
		return resourceOnPoint;
	}

	findResource(collector: Collector): Resource | undefined {
		const resources = this.gameObjects.filter(gameObject => gameObject instanceof Resource);
		const availableResources = resources.filter(resource => resource.available)
		let closestDistance = Infinity;
		let closestObj = availableResources[0];
		availableResources.forEach(resource => {
			if(collector.distanceTo(resource) < closestDistance) {
				closestDistance = collector.distanceTo(resource);
				closestObj = resource;
			}
		});
		return closestObj;

	}

	public addGameObject(gameObject: GameObject) {
		this.gameObjects.push(gameObject);
	}

	public addGameObjects(gameObjects: GameObject[]) {
		gameObjects.forEach(gameObject => this.addGameObject(gameObject));
	}

	public getGameObjects(): GameObject[] {
		return this.gameObjects;
	}

	public removeGameObject(gameObject: GameObject) {
		const index = this.gameObjects.indexOf(gameObject);
		if (index > -1) {
			this.gameObjects.splice(index, 1);
		}
	}


	private loop(timestamp: number) {
		const delta = Math.min((timestamp - this.lastTimeStamp) / 1000, 0.1); // Clamp to 0.1 seconds max
		this.lastTimeStamp = timestamp;

		// Process game logic
		this.update(delta);

		// Render the frame
		this.render();

		requestAnimationFrame(this.loop.bind(this));
	}

	private update(delta: number) {
		// Update game logic here
		this.gameObjects.forEach(gameObject => gameObject.update(delta));
		
	}

	private render() {
		// Clear the canvas
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillStyle = '#2aa18d';
		this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);	
			
		// Render game objects
		this.gameObjects.forEach(gameObject => gameObject.render(this.ctx));		

	}
}
