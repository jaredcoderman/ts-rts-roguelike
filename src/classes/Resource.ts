import { Structure } from "./Structure";

export class Resource extends Structure {
	available: boolean = true;
	
	constructor(x: number, y: number, size: number, color: string, maxHealth: number) {
		super(x, y, size, color, maxHealth);
	}

	deplete(amount: number) {
		if(this.health <= 0) return;
		if(this.health - amount < 0) {
			this.health = 0;
			console.log("no longer available");
			this.available = false;
		} else {
			this.health -= amount;	
		}
	}

	replenish() {
		this.health = this.maxHealth; 
	}
};
