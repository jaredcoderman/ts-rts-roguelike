import { GameManager } from "../src/classes/GameManager"

describe("GameManager class", () => {
	describe("constructor", () => {
		it("should create a GameManager instance with a canvas", () => {
			let canvas = document.createElement("canvas");
			canvas.width = 400;
			canvas.height = 300;

			GameManager.getInstance(canvas);
			expect(GameManager.instance).not.toBeNull();
						
		});
	});

	describe("init", () => {
		it("should make a grid the right number of rows and columns", () => {
			let canvas = document.createElement("canvas");
			canvas.width = 400;
			canvas.height = 300;

			let instance = GameManager.getInstance(canvas);
			instance.init();
			expect(instance.grid).not.toBeNull();
		});
	});
});
