import { GameObject } from "./GameObject";
import { Unit } from "./Unit"
import { Grid } from "./Grid"
import { InputManager } from "./InputManager"

export class GameManager {
	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private gameObjects: GameObject[];
	private lastTimeStamp: number;
	private static instance: GameManager;
	private cellSize: number = 20;
	private grid: Grid | undefined;
	private inputManager: InputManager | undefined;
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d")!;
		this.lastTimeStamp = 0;
		this.gameObjects = [];
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

	public init() {
		// Set the size
		this.canvas.width = window.innerWidth - 20;
		this.canvas.height = window.innerHeight - 20;
		
		// Create the grid
		let rows = Math.floor(this.canvas.width / this.cellSize);
		let cols = Math.floor(this.canvas.height / this.cellSize);
		this.grid = new Grid(rows, cols, this.cellSize);	
		this.grid.drawGrid();

		// Make units
	
		// Init input
		this.inputManager = new InputManager();

		// request animation frame here
		requestAnimationFrame(this.loop.bind(this));
	}

	public addGameObject(gameObject: GameObject) {
		this.gameObjects.push(gameObject);
	}

	public addGameObjects(gameObjects: GameObject[]) {
		gameObjects.forEach(gameObject => this.addGameObject(gameObject));
	}

	public removeGameObject(gameObject: GameObject) {
		const index = this.gameObjects.indexOf(gameObject);
		if (index > -1) {
			this.gameObjects.splice(index, 1);
		}
	}

	private loop(timestamp: number) {
		const delta = timestamp - this.lastTimeStamp;
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
			
		// Render game objects
		this.gameObjects.forEach(gameObject => gameObject.render(this.ctx));		

	}
}
