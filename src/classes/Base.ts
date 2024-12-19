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
        if (this.sprite.complete) {
            ctx.drawImage(this.sprite, this.x, this.y, this.size, this.size)
        } else {
            throw new Error('Sprite not complete')
        }
    }
}
