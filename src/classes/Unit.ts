import { GameObject } from "./GameObject"
export class Unit extends GameObject {
	speed: number;

	constructor(x: number, y: number, speed: number) {
		super(x, y);
		this.speed = speed;
	}

	update(delta: number) {
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y, 20, 20);
	}

}
