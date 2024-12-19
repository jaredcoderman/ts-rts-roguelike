import { Vector2 } from "../utils/Vector";
import { GameObject } from "./GameObject"


export class Unit extends GameObject {
	speed: number;
	selectable: boolean;
	lookVector: Vector2;
	rotation: number;
	targetPosition: Vector2 | null;
	selected: boolean = false;		

	constructor(x: number, y: number, size: number, speed: number, spriteSrc: string) {
		super(x, y, size, spriteSrc);
		this.speed = speed;
		this.selectable = true;
		this.rotation = 0;
		this.lookVector = new Vector2(1,0);
		this.targetPosition = null;
	}

	update(delta: number) {
		this.moveTowardsTarget(delta);	
	}
	
	select() {
		this.selected = true;
	}

	deselect() {
		this.selected = false;
	}

	setTargetPosition(position: Vector2) {
		this.targetPosition = position;
	}

	resetTarget() {
		this.targetPosition = null
	}

	moveTowardsTarget(delta: number) {
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


	render(ctx: CanvasRenderingContext2D) {
    	// Save the current context state
    	ctx.save();

    	// Move the canvas origin to the center of the unit
    	const centerX = this.x + this.size / 2;
    	const centerY = this.y + this.size / 2;
   
		// Selected UI
		if(this.selected) {
			ctx.beginPath();
    		ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI); // Circle outline
    		ctx.lineWidth = 2; // Set the border width
    		ctx.strokeStyle = "#40ffdf"; // Set the border color
			ctx.stroke();
		}


		ctx.translate(centerX, centerY);

    	// Calculate rotation based on the lookVector
    	const angle = Math.atan2(this.lookVector.y, this.lookVector.x);
    	ctx.rotate(angle);

    	// Draw the rectangle centered at the origin
    	if(this.sprite.complete) {
			ctx.drawImage(this.sprite, -this.size / 2, -this.size / 2, this.size, this.size);
		} else {
			throw new Error("Sprite not complete");
		}
	
 		// Restore the context state
    	ctx.restore();
	}


}
