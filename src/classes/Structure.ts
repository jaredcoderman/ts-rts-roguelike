import { GameObject } from './GameObject'

export class Structure extends GameObject {
    health: number
    selected: boolean = false
    maxHealth: number
    constructor(
        x: number,
        y: number,
        size: number,
        spriteSrc: string,
        maxHealth: number
    ) {
        super(x, y, size, spriteSrc)
        this.maxHealth = maxHealth
        this.health = maxHealth
    }

    select() {
        if (this.selected) return
        this.selected = true
    }

    deselect() {
        if (!this.selected) return
        this.selected = false
    }
}
