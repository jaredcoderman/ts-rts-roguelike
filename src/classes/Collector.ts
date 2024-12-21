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
	looping: boolean = false
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

	// Takes the time to collect the resource
	tryExtract() {
		if (
			this.moveTarget instanceof Resource &&
			!this.encumbered &&
			this.moveTarget.available
		) {
			if (this.looping) {
				return
			}
			const target = this.moveTarget
			this.looping = true
			let collectionTime = Math.floor(this.collectionTimeSeconds / 1000)

			console.log(collectionTime)
			let currentTime = 0

			const interval = setInterval(() => {
				if (
					this.moveTarget instanceof Resource &&
					this.moveTarget.available &&
					currentTime < collectionTime
				) {
					currentTime++
					if (currentTime === collectionTime) {
						target.deplete(5)
						this.encumbered = true
						clearInterval(interval) // Stop the interval
					}
				} else {
					console.log('Breaking loop')
					this.looping = false
					clearInterval(interval) // Stop the interval
				}
			}, 1000)
		}
	}

	tryDeposit() {
		if (this.moveTarget instanceof Base && this.encumbered) {
			this.deposit()
			this.collectNextResource()
		}
	}

	determineNextAction() {
		this.targetPosition = null

		this.tryExtract()
		this.tryDeposit()
	}

	tryMoveToNode() {
		if (!this.encumbered && this.moveTarget) {
			// If resource is depleted while moving towards it find new one, otherwise
			// move towards it.
			if (
				this.moveTarget instanceof Resource &&
				!this.moveTarget.available
			) {
				this.determineNextAction()
				this.collectNextResource()
			} else {
				this.setTargetPosition(this.moveTarget.getPosition())
			}
		}
	}

	tryFindBase() {
		if (this.encumbered && !this.targetPosition) {
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
	}

	tryFindNode() {
		if (!this.encumbered && !this.moveTarget) {
			this.collectNextResource()
		}
	}

	tryMove(delta: number) {
		if (this.targetPosition) {
			this.moveTowardsTarget(delta)
		}
	}

	update(delta: number) {
		if (this.collecting) {
			this.tryMoveToNode()
			this.tryFindBase()
			this.tryFindNode()
		}
		this.tryMove(delta)
	}
}
