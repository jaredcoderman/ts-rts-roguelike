import { GameObject } from './GameObject'

export class Debugger {
    public static instance: Debugger
    private trackedObjects: GameObject[]
    private objectMap: Map<number, HTMLElement> = new Map()

    constructor() {
        this.trackedObjects = []
    }

    public getInstance(): Debugger {
        if (!Debugger.instance) {
            Debugger.instance = new Debugger()
        }
        return Debugger.instance
    }

    trackObject(obj: GameObject) {
        this.trackedObjects.push(obj)
    }

    render(debugging: Boolean) {
        const debugDiv = document.getElementById('debug-container')
        if (!debugDiv) {
            throw new Error('Debug div not found')
        }

        if (!debugging) {
            debugDiv.style.display = 'none'
        } else {
            debugDiv.style.display = 'block'
        }

        this.trackedObjects.forEach((obj) => {
            let element = this.objectMap.get(obj.id)
            if (!element) {
                element = document.createElement('div')
                element.className = 'game-object-debug'
                debugDiv.appendChild(element)
                this.objectMap.set(obj.id, element)
            }
            const centerX = obj.x - obj.size / 2
            const centerY = obj.y - obj.size / 2

            element.textContent = `ID: ${obj.id}, Position: (${centerX}, ${centerY}), Size: ${obj.size}`
            element.style.position = 'absolute'
            element.style.left = `${centerX}px`
            element.style.top = `${centerY}px`
            element.style.border = '1px solid black'
            element.style.padding = '5px'
            element.style.color = 'black'
            element.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'
        })
    }
}
