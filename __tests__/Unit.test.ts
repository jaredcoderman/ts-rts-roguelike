import { Unit } from "../src/classes/Unit"

describe('Unit class', () => {
	// Test constructor
	describe('constructor', () => {
		it('should create a new unit with properties x, y, color, speed', () => {
			const unit = new Unit(50, 50, 20, 5, "red");
			expect(unit.x).toBe(50);
			expect(unit.y).toBe(50);
			expect(unit.color).toBe("red");
			expect(unit.speed).toBe(5);
		});
	});
});
