import { GameObject } from '../src/classes/GameObject'

describe('GameObject class', () => {
    describe('constructor', () => {
        it('should have an x, y, size', () => {
            const go = new GameObject(300, 200, 20)
            expect(go.x).toBe(300)
            expect(go.y).toBe(200)
            expect(go.size).toBe(20)
        })
    })
})
