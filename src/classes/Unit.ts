import { GameObject } from "./GameObject"
export class Unit extends GameObject {
	speed: number;
	selectable: boolean;
	color: string;

	constructor(x: number, y: number, size: number, speed: number, color: string) {
		super(x, y, size);
		this.color = color; 
		this.speed = speed;
		this.selectable = true;
	}

//	update(delta: number) {
//			
//	}

	setColor(color: string) {
		this.color = color;
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, 20, 20);
	}

}
