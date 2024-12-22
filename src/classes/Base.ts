import { Collector } from './Collector'
import { GameManager } from './GameManager'
import { Structure } from './Structure'
import { Unit } from './Unit'

export class Base extends Structure {
	units: Map<number, Unit>
	unitsCount: number
	maxUnits: number
	gameManager: GameManager
	constructor(
		x: number,
		y: number,
		size: number,
		spriteSrc: string,
		maxHealth: number
	) {
		super(x, y, size, spriteSrc, maxHealth)
		this.units = new Map()
		this.unitsCount = 0
		this.maxUnits = 10
		this.gameManager = GameManager.getInstance()
	}

	addUnit(unit: Unit) {
		if (this.units.has(unit.id) && this.unitsCount < this.maxUnits) {
			this.units.set(unit.id, unit)
			this.unitsCount++
		} else {
			throw new Error('Tried to add a unit that is already in units')
		}
	}

	makeUnit<T extends Unit>(type: new (...args: any[]) => T): boolean {
		if ((type as any).isCollector) {
			let newCollector = new Collector(
				this.x + 30,
				this.y + 30,
				20,
				100,
				'Tiles/collector.png',
				3
			)
			this.gameManager.addGameObject(newCollector)
			//this.addUnit(newCollector)
			newCollector.collecting = true
			return true
		}
		return false
	}

	removeUnit(unitId: number): boolean {
		if (this.units.has(unitId)) {
			this.units.delete(unitId)
			this.unitsCount--
			return true
		}
		return false
	}

	getUnit(unitId: number): Unit | undefined {
		const unit = this.units.get(unitId)
		return unit
	}

	render(ctx: CanvasRenderingContext2D) {
		ctx.save()
		// Move the canvas origin to the center of the unit
		const centerX = this.x + this.size / 2
		const centerY = this.y + this.size / 2

		if (this.selected) {
			ctx.beginPath()
			ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI) // Circle outline
			ctx.lineWidth = 2 // Set the border width
			ctx.strokeStyle = '#40ffdf' // Set the border color
			ctx.stroke()
		}

		if (this.sprite.complete) {
			ctx.drawImage(this.sprite, this.x, this.y, this.size, this.size)
		} else {
			throw new Error('Sprite not complete')
		}
	}
}
