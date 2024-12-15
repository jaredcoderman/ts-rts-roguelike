import { GameManager } from "../src/classes/GameManager";
import { Player } from "../src/classes/Player"

describe("Player class", () => {
	
	describe("constructor", () => {
		it("should run without error", () => {
			let canvas = document.createElement("canvas");
			canvas.height = 300;
			canvas.width = 200;

			GameManager.getInstance(canvas);
			new Player();
			expect(Player["instance"]).not.toBeNull();
		});
	});
});
