import { GameObject } from "./GameObject"

export class InputManager {
	private selected: GameObject;
	private static instance: InputManager;
	
	constructor() {
		this.initListeners();
	}

	private initListeners() {
		window.addEventListener("mousedown", (event) => {
			console.log("mousedown");
		});

		window.addEventListener("mouseup", (event) => {
			console.log("mouseup");
		});
	}
	
	public static getInstance(): InputManager {
		if(!InputManager.instance) {
			InputManager.instance = new InputManager();
		}
		return InputManager.instance;
	}


}
