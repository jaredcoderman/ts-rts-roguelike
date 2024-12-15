import { Vector2 } from "../utils/Vector";
import { GameObject } from "./GameObject"


export class Unit extends GameObject {
	speed: number;
	selectable: boolean;
	color: string;
	lookVector: Vector2;
	rotation: number;
	targetPosition: Vector2 | null;
		
	constructor(x: number, y: number, size: number, speed: number, color: string) {
		super(x, y, size);
		this.color = color; 
		this.speed = speed;
		this.selectable = true;
		this.rotation = 0;
		this.lookVector = new Vector2(1,0);
		this.targetPosition = null;
	}

	update(delta: number) {
		this.moveTowards(delta);	
	}
	
	select() {
		this.setColor("red");
	}

	deselect() {
		this.setColor("black");
	}

	setTargetPosition(position: Vector2) {
		this.targetPosition = position;
	}

	resetTarget() {
		this.targetPosition = null
	}

	moveTowards(delta: number) {
		if(!this.targetPosition) return;
		const direction = new Vector2(
                this.targetPosition.x - (this.x + (this.size / 2)),
                this.targetPosition.y - (this.y + (this.size / 2))
    	);
   		const distance = direction.magnitude();
		
		if (distance > 1) { // Check if not at the target
			// Normalize direction and scale by speed and delta
			const moveStep = direction.normalize().scale(this.speed * delta);
			// Update position
			this.x += moveStep.x;
			this.y += moveStep.y;

			// Update lookVector and rotation
			this.lookVector = direction.normalize();
			this.rotation = this.lookVector.getAngle();
		} else {
			// Arrived at the target
			this.resetTarget();
		}	
	}

	setColor(color: string) {
		this.color = color;
	}

	render(ctx: CanvasRenderingContext2D) {
    	// Save the current context state
    	ctx.save();

    	// Move the canvas origin to the center of the unit
    	const centerX = this.x + this.size / 2;
    	const centerY = this.y + this.size / 2;
    	ctx.translate(centerX, centerY);

    	// Calculate rotation based on the lookVector
    	const angle = Math.atan2(this.lookVector.y, this.lookVector.x);
    	ctx.rotate(angle);

    	// Draw the rectangle centered at the origin
    	ctx.fillStyle = this.color;
    	ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
	
    	// Restore the context state
    	ctx.restore();
	}


}
