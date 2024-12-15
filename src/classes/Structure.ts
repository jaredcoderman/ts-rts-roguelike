import { GameObject } from "./GameObject";

export class Structure extends GameObject {
	color: string;
	health: number;
	selected: boolean = false;
	maxHealth: number;
	constructor(x: number, y: number, size: number, color: string, maxHealth: number) {
		super(x, y, size);
		this.color = color;
		this.maxHealth = maxHealth;
		this.health = maxHealth;
		
	}

	select() {
		if(this.selected) return;
		this.selected = true;
		this.color = "red";
	}

	deselect() {
		if(!this.selected) return;
		this.selected = false;
		this.color = "black";
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.size, this.size);
	}
};
