import { Structure } from './Structure'

export class Base extends Structure {
	constructor(
		x: number,
		y: number,
		size: number,
		spriteSrc: string,
		maxHealth: number
	) {
		super(x, y, size, spriteSrc, maxHealth)
	}

	render(ctx: CanvasRenderingContext2D) {
		// Move the canvas origin to the center of the unit
		const centerX = this.x - this.size / 2
		const centerY = this.y - this.size / 2

		if (this.sprite.complete) {
			ctx.drawImage(this.sprite, centerX, centerY, this.size, this.size)
		} else {
			throw new Error('Sprite not complete')
		}
	}
}
