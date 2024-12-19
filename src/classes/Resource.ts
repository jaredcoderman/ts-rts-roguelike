import { Structure } from "./Structure";

export class Resource extends Structure {
	available: boolean = true;
	
	constructor(x: number, y: number, size: number, spriteSrc: string, maxHealth: number) {
		super(x, y, size, spriteSrc, maxHealth);
	}

	deplete(amount: number) {
		this.health = this.health - amount;
		if(this.health <= 0) {
	
			this.available = false;
		}
	}

	replenish() {
		this.health = this.maxHealth; 
	}

	render(ctx: CanvasRenderingContext2D) {
		if(this.sprite.complete && this.available) {
			ctx.drawImage(this.sprite, this.x, this.y, this.size, this.size);
		} else {
			ctx.fillStyle = "black";
			//ctx.fillRect(this.x, this.y, this.size, this.size);

		}
		
	}
};
