import { UIComponent } from './UIComponent'

export class UIManager {
    public static instance: UIManager
    private uiComponents: UIComponent[]

    constructor() {
        this.uiComponents = []
        this.initUIComponents()
    }

    public static getInstance() {
        if (!UIManager.instance) {
            UIManager.instance = new UIManager()
        }
        return UIManager.instance
    }

    addUIComponent(component: UIComponent) {
        this.uiComponents.push(component)
    }

    initUIComponents() {
        // Resource amount
        let resourceText = document.getElementById('resource-text')
        if (resourceText) {
            const resourceTextComponent = new UIComponent(resourceText)
            this.addUIComponent(resourceTextComponent)
        }
    }

    findComponent(id: string): UIComponent | null {
        if (this.uiComponents.length == 0) {
            return null
        }
        const component = this.uiComponents.find(
            (component) => component.id != undefined && component.id === id
        )
        if (component) {
            return component
        }
        return null
    }

    updateComponentText(id: string, text: string) {
        const component = this.findComponent(id)
        if (component) {
            component.updateText(text)
        }
    }
}
