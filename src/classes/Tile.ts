import { GameObject } from "./GameObject"

export class Tile extends GameObject {
	private cellSize: number;
	private color: string;
	private strokeColor: string;

	constructor(x: number, y: number, color: string, strokeColor: string, cellSize: number) {
		super(x,y);
		this.color = color;
		this.cellSize = cellSize;
		this.strokeColor = strokeColor;
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.cellSize, this.cellSize);

		ctx.strokeStyle = this.strokeColor;
		ctx.lineWidth = 2;
		ctx.strokeRect(this.x, this.y, this.cellSize, this.cellSize);
	}
}
