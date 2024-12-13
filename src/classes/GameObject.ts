export class GameObject {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	update(delta: number) {
		// Updates the object state
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y, 20, 20);
	}
}
