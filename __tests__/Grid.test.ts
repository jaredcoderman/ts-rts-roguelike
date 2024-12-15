import { GameManager } from "../src/classes/GameManager";
import { Grid } from "../src/classes/Grid";


describe("Grid class", () => {
	describe("constructor", () => {
		it("should have rows, cols and cells set to an empty matrix", () => {
			let canvas = document.createElement("canvas");
			canvas.width = 300;
			canvas.height = 200;

			GameManager.getInstance(canvas);

			let grid = new Grid(10, 10, 20);
			expect(grid["cells"].length).toBe(grid["rows"]);
			expect(grid["cells"][0].length).toBe(grid["cols"]);
		});
	});
});
