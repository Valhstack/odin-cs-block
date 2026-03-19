import { fibonacci } from './fibonacci.js';

describe('fibonacci sequence', () => {
    test('the file and function exists', () => {
        expect(typeof fibonacci).toBe('function');
    });

    test('the function takes a number and returns fibonacci sequence for it', () => {
        expect(fibonacci(8)).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
    });
});