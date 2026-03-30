import { knightShortestPath } from './knightTravail.js';

describe('knightShortestPath', () => {

    test('returns same position if start equals target', () => {
        const start = [0, 0];
        const result = knightShortestPath(start, start);

        expect(result).toEqual([[0, 0]]);
    });

    test('finds shortest path in one move', () => {
        const result = knightShortestPath([0, 0], [2, 1]);

        expect(result.length).toBe(2);
        expect(result[0]).toEqual([0, 0]);
        expect(result[result.length - 1]).toEqual([2, 1]);
    });

    test('path stays within board bounds', () => {
        const result = knightShortestPath([0, 0], [7, 7]);

        for (const [x, y] of result) {
            expect(x).toBeGreaterThanOrEqual(0);
            expect(x).toBeLessThan(8);
            expect(y).toBeGreaterThanOrEqual(0);
            expect(y).toBeLessThan(8);
        }
    });

});