import { Vector2 } from '../utils/Vector'

export class GameObject {
    static id: number = 0
    x: number
    y: number
    size: number
    sprite: HTMLImageElement
    public id: number
    constructor(x: number, y: number, size: number, spriteSrc: string) {
        this.x = x
        this.y = y
        this.size = size
        this.sprite = new Image()
        this.sprite.src = spriteSrc
        this.id = GameObject.id++
    }

    update(_delta: number) {
        // Updates the object state
    }

    containsPoint(point: Vector2): boolean {
        const x = point.x
        const y = point.y
        return (
            x >= this.x &&
            x <= this.x + this.size &&
            y >= this.y &&
            y <= this.y + this.size
        )
    }

    getPosition(): Vector2 {
        return new Vector2(this.x, this.y)
    }

    distanceTo(other: GameObject) {
        return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2)
    }

    render(ctx: CanvasRenderingContext2D) {
        if (this.sprite.complete) {
            ctx.drawImage(this.sprite, this.x, this.y, this.size, this.size)
        } else {
            ctx.fillStyle = 'blue'
            ctx.fillRect(this.x, this.y, 20, 20)
        }
    }

    toString() {
        return `${typeof this}: Data`
    }
}
