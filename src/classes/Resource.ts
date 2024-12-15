import { Structure } from "./Structure";

export class Resource extends Structure {
	
	constructor(x: number, y: number, size: number, color: string, maxHealth: number) {
		super(x, y, size, color, maxHealth);
	}

	deplete(amount: number) {
		if(this.health <= 0) return;
		if(this.health - amount < 0) {
			this.health = 0;
		} else {
			this.health -= amount;	
		}
	}

	replenish() {
		this.health = this.maxHealth; 
	}
};
