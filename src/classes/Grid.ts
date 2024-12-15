import { GameObject } from "./GameObject"
import { Tile } from "./Tile"
import { GameManager } from "./GameManager"

type Cell = GameObject[];

export class Grid {
	private rows: number;
	private cols: number;
	private cellSize: number;
	private cells: Cell[][];
	private gameManager: GameManager;

	constructor(rows: number, cols: number, cellSize: number) {
		this.rows = rows;
		this.cols = cols;
		this.cellSize = cellSize;
		this.gameManager = GameManager.getInstance();
		this.cells = Array.from({ length: this.rows }, () => 
			Array.from({ length: this.cols }, () => [])
		);
	}

	public drawGrid() {
		// Fill each cell with a tile, each tile has a row, col ref
		for(let row = 0; row < this.rows; row++) {
			for(let col = 0; col < this.cols; col++) {
				let currentCell = this.cells[row][col]
				// x, y, color, strokeColor, size
				let newTile = new Tile(row * this.cellSize, col * this.cellSize, this.cellSize, '#D2B48C', '#8B4513');
				this.gameManager.addGameObject(newTile);
				currentCell.push(newTile);
			}
		}
	}

	addGameObject(gameObject: GameObject) {
		const { row, col } = this.getCellCoordinates(gameObject.x, gameObject.y);
		if (this.isValidCell(row, col)) {
			this.cells[row][col].push(gameObject);
		}
	}

	private getCellCoordinates(x: number, y: number) {
		return {
			row: Math.floor(y / this.cellSize),
			col: Math.floor(x / this.cellSize)
		}
	}

	private isValidCell(row: number, col: number) {
		return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
	}
}
