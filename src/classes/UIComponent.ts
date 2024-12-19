export class UIComponent {
    private element: HTMLElement
    id: string
    constructor(element: HTMLElement) {
        this.element = element
        this.id = element.id
    }

    getElement(): HTMLElement {
        return this.element
    }

    updateText(text: string) {
        this.element.innerHTML = text
    }
}
