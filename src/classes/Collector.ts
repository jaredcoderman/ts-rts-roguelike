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
	debugText: string = ''
	extracting: boolean = false
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
		this.updateDebugText()
	}

	updateDebugText() {
		this.debugText = `
			Encumbered: ${this.encumbered}
			Collecting: ${this.collecting}
			MoveTarget: ${this.moveTarget != null}
			TargetPosition: ${this.targetPosition}
			Extracting: ${this.extracting}
		`
	}

	// to make tryMoveToNode run in update()
	moveToCollect(resource: Resource) {
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
		this.targetPosition = null
		let resource = this.gameManager.findResource(this)
		if (resource && resource instanceof Resource && resource.available) {
			this.moveToCollect(resource)
		}
	}

	// Takes the time to collect the resource
	tryExtract() {
		if (
			this.moveTarget instanceof Resource &&
			!this.encumbered &&
			this.moveTarget.available &&
			!this.extracting &&
			!this.moveTarget.beingExtracted
		) {
			let collectionTime = Math.floor(this.collectionTimeSeconds / 50)
			let currentTime = 0
			this.extracting = true
			this.moveTarget.beingExtracted = true
			const interval = setInterval(() => {
				if (
					this.moveTarget instanceof Resource &&
					this.moveTarget.available &&
					currentTime < collectionTime
				) {
					currentTime++

					if (currentTime === collectionTime) {
						this.moveTarget.deplete(20)
						this.encumbered = true
						this.extracting = false
						this.moveTarget.beingExtracted = false
						clearInterval(interval) // Stop the interval
					}
				} else {
					this.extracting = false
					if (this.moveTarget instanceof Resource) {
						this.moveTarget.beingExtracted = false
					}
					clearInterval(interval) // Stop the interval
				}
			}, 50)
		}
	}

	tryDeposit() {
		if (this.moveTarget instanceof Base && this.encumbered) {
			this.deposit()
			this.collectNextResource()
		}
	}

	determineNextAction() {
		if (this.extracting) {
			return
		}

		this.targetPosition = null
		this.tryExtract()
		this.tryDeposit()
	}

	tryMoveToNode() {
		if (!this.encumbered && this.moveTarget && !this.extracting) {
			// If resource is depleted while moving towards it find new one, otherwise
			// move towards it.
			if (
				this.moveTarget instanceof Resource &&
				(!this.moveTarget.available || this.moveTarget.beingExtracted)
			) {
				console.log(`
					available: ${this.moveTarget.available}\n
					beingExtracted: ${this.moveTarget.beingExtracted}
				`)
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
		this.updateDebugText()

		// Action logic
		if (this.collecting) {
			this.tryFindNode()
			this.tryMoveToNode()
			this.tryFindBase()
		}
		this.tryMove(delta)
	}
}
