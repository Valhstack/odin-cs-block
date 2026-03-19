import { mergeSort } from './mergeSort.js';

describe('testing the merge sort algorithm', () => {
    test('file and function exists', () => {
        expect(typeof mergeSort).toBe('function');
    });

    test('if empty array or one element array is passed, empry array/original array is returned', () => {
        expect(mergeSort([])).toEqual([]);
        expect(mergeSort([1])).toEqual([1]);
    });

    test('if unsorted array is passed, sorted array is returned', () => {
        expect(mergeSort([2, 7, 0, 4])).toEqual([0, 2, 4, 7]);
        expect(mergeSort([3, 2, 1, 13, 8, 5, 0, 1])).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
        expect(mergeSort([105, 79, 100, 110])).toEqual([79, 100, 105, 110]);
    });

    test('if sorted array is passed, sorted array is returned', () => {
        expect(mergeSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
    });
});