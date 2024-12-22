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

	show() {
		this.element.style.display = 'block'
	}

	hide() {
		this.element.style.display = 'hide'
	}

	updateText(text: string) {
		this.element.innerHTML = text
	}
}
