import { Vector2 } from '../utils/Vector'
import { Collector } from './Collector'
import { GameManager } from './GameManager'
import { GameObject } from './GameObject'
import { Structure } from './Structure'
import { Tile } from './Tile'
import { UIManager } from './UIManager'
import { Unit } from './Unit'

export class Player {
    private static instance: Player
    private gameManager: GameManager
    private selected: GameObject | undefined
    resources: number
    maxResources: number
    constructor() {
        this.initListeners()
        this.gameManager = GameManager.getInstance()
        this.resources = 0
        this.maxResources = 16
    }

    select(point: Vector2) {
        let gameObjects = this.gameManager.getGameObjects()
        let gameObject = gameObjects.find(
            (gameObject) =>
                gameObject.containsPoint(point) && !(gameObject instanceof Tile)
        )
        if (gameObject instanceof Unit || gameObject instanceof Structure) {
            this.selected = gameObject
            gameObject.select()
        }
    }

    addResources(amount: number) {
        if (this.resources + amount <= this.maxResources) {
            this.resources += amount
        } else {
            this.resources = this.maxResources
        }
        UIManager.getInstance().updateComponentText(
            'resource-text',
            `${this.resources}/${this.maxResources}`
        )
    }

    deselect() {
        if (
            this.selected &&
            (this.selected instanceof Unit ||
                this.selected instanceof Structure)
        ) {
            this.selected.deselect()
        }
        this.selected = undefined
    }

    command(point: Vector2) {
        if (this.selected instanceof Collector) {
            let resource = this.gameManager.queryResources(point)
            if (resource) {
                this.selected.collect(resource)
                this.deselect()
            } else {
                if (this.selected.collecting) {
                    this.selected.stopCollecting()
                }
                this.selected.setTargetPosition(point)
            }
        } else if (this.selected instanceof Unit) {
            this.selected.setTargetPosition(point)
        }
    }

    private initListeners() {
        window.addEventListener('mousedown', (event) => {
            const x = event.clientX
            const y = event.clientY
            const point = new Vector2(x, y)
            if (this.selected === undefined) {
                Player.instance.select(point)
            } else {
                this.command(point)
            }
        })

        window.addEventListener('mouseup', (_event) => {})

        window.addEventListener('keydown', (event) => {
            if (event.key == 'Escape') {
                this.deselect()
            }
            if (event.key == '`') {
                console.log('KEY PRESSED')
                this.gameManager.toggleDebug()
            }
        })
    }

    public static getInstance(): Player {
        if (!Player.instance) {
            Player.instance = new Player()
        }
        return Player.instance
    }
}
