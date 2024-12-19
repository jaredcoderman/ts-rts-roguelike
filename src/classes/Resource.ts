import { Structure } from './Structure'

export class Resource extends Structure {
    available: boolean = true
    refreshTimeSeconds: number

    constructor(
        x: number,
        y: number,
        size: number,
        spriteSrc: string,
        maxHealth: number,
        refreshTimeSeconds: number
    ) {
        super(x, y, size, spriteSrc, maxHealth)
        this.refreshTimeSeconds = refreshTimeSeconds * 1000
    }

    deplete(amount: number) {
        this.health = this.health - amount
        if (this.health <= 0) {
            this.available = false
            setTimeout(() => {
                this.replenish()
            }, this.refreshTimeSeconds)
        }
    }

    replenish() {
        this.health = this.maxHealth
        this.available = true
    }

    render(ctx: CanvasRenderingContext2D) {
        if (this.sprite.complete && this.available) {
            ctx.drawImage(this.sprite, this.x, this.y, this.size, this.size)
        }
    }
}
