import { GameObject } from "./GameObject"

export class Tile extends GameObject {
	cellSize: number;
	color: string;
	strokeColor: string;

	constructor(x: number, y: number, cellSize: number, color: string, strokeColor: string) {
		super(x,y, cellSize);
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
