	import { Structure } from "../src/classes/Structure"

describe("Structure class", () => {
	describe("constructor", () => {
		it("should run without error", () => {
			const s = new Structure(20, 20, 35, "black", 30); 
			expect(s.x).toBe(20);
			expect(s.y).toBe(20);
			expect(s.size).toBe(35);
			expect(s.color).toBe("black");
			expect(s.health).toBe(30);
		});
	});
});
