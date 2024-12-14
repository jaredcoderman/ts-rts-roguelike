export class GameObject {
	x: number;
	y: number;
	size: number;
	constructor(x: number, y: number, size: number) {
		this.x = x;
		this.y = y;
		this.size = size;
	}

//	update(delta: number) {
//		// Updates the object state
//	}

	containsPoint(x: number, y:number): boolean {
		return x >= this.x && x <= this.x + this.size && this.y >= y && this.y <= this.y + this.size;
	};


	render(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y, 20, 20);
	}
}
