import { Base } from './Base'
import { GameManager } from './GameManager'
import { GameObject } from './GameObject'
import { Player } from './Player'
import { Resource } from './Resource'
import { Unit } from './Unit'

export class Collector extends Unit {
    collectionTimeSeconds: number
    moveTarget: GameObject | null
    encumbered: boolean = false
    collecting: boolean = false
    gameManager: GameManager
    collectAmount: number = 1
    bob: string = 'hi'
    constructor(
        x: number,
        y: number,
        size: number,
        speed: number,
        spriteSrc: string,
        collectionTimeSeconds: number
    ) {
        super(x, y, size, speed, spriteSrc)
        this.collectionTimeSeconds = collectionTimeSeconds * 1000
        this.moveTarget = null
        this.gameManager = GameManager.getInstance()
    }

    collect(resource: Resource) {
        this.collecting = true
        this.moveTarget = resource
    }

    stopCollecting() {
        this.moveTarget = null
        this.collecting = false
        this.targetPosition = null
    }

    deposit() {
        if (this.encumbered) {
            this.encumbered = false
            Player.getInstance().addResources(this.collectAmount)
        }
    }

    collectNextResource() {
        this.moveTarget = null
        let resource = this.gameManager.findResource(this)
        if (resource && resource instanceof Resource) {
            this.collect(resource)
        }
    }

    resetTarget() {
        this.targetPosition = null
        if (
            this.moveTarget instanceof Resource &&
            !this.encumbered &&
            this.moveTarget.available
        ) {
            const target = this.moveTarget
            setTimeout(() => {
                target.deplete(10)
                this.encumbered = true
            }, this.collectionTimeSeconds)
        }
        if (this.moveTarget instanceof Base && this.encumbered) {
            this.deposit()
            this.collectNextResource()
        }
    }

    update(delta: number) {
        // When to move to node
        if (this.collecting && !this.encumbered && this.moveTarget) {
            // If resource is depleted while moving towards it find new one, otherwise
            // move towards it.
            if (
                this.moveTarget instanceof Resource &&
                !this.moveTarget.available
            ) {
                this.resetTarget()
                this.collectNextResource()
            } else {
                this.setTargetPosition(this.moveTarget.getPosition())
            }
        } else if (this.collecting && this.encumbered && !this.targetPosition) {
            // Move to base
            // Find nearest base and move to to it
            const nearestBase = this.gameManager.findClosestOfType(this, Base)
            if (!nearestBase) {
                throw new Error(
                    'Tried to find a base to deposit but there are none'
                )
            }
            this.moveTarget = nearestBase
            this.setTargetPosition(this.moveTarget.getPosition())
        }

        // When collecting but no nodes, check for nodes
        if (this.collecting && !this.encumbered && !this.moveTarget) {
            this.collectNextResource()
        }
        if (this.targetPosition) {
            this.moveTowardsTarget(delta)
        }
    }
}
