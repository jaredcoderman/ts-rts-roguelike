import { Tile } from '../src/classes/Tile'

describe('Tile class', () => {
    describe('constructor', () => {
        it('should create a new tile with x, y, size, color, strokeColor', () => {
            const tile = new Tile(50, 50, 20, 'red', 'black')
            expect(tile.x).toBe(50)
            expect(tile.y).toBe(50)
            expect(tile.size).toBe(20)
        })
    })
})
