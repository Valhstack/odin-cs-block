import { HashMap } from "./hashMap.js";

describe('HashMap', () => {
    let map;

    beforeEach(() => {
        map = new HashMap();

        map.set('apple', 'red');
        map.set('banana', 'yellow');
        map.set('carrot', 'orange');
        map.set('dog', 'brown');
        map.set('elephant', 'gray');
        map.set('frog', 'green');
        map.set('grape', 'purple');
        map.set('hat', 'black');
        map.set('ice cream', 'white');
        map.set('jacket', 'blue');
        map.set('kite', 'pink');
        map.set('lion', 'golden');
    });

    test('triggers resize and preserves data', () => {
        map.set('moon', 'silver');

        expect(map.get('apple')).toBe('red');
        expect(map.get('moon')).toBe('silver');
        expect(map.has('lion')).toBe(true);
    });

    test('overwrites existing key', () => {
        map.set('apple', 'green');
        expect(map.get('apple')).toBe('green');
    });

    test('remove works correctly', () => {
        expect(map.remove('banana')).toBe(true);
        expect(map.get('banana')).toBe(null);
        expect(map.remove('banana')).toBe(false);
    });

    test('has works correctly', () => {
        expect(map.has('apple')).toBe(true);
        expect(map.has('unknown')).toBe(false);
    });

    test('keys returns all keys', () => {
        const keys = map.keys();
        expect(keys).toContain('apple');
        expect(keys).toContain('lion');
    });

    test('values returns all values', () => {
        const values = map.values();
        expect(values).toContain('red');
        expect(values).toContain('golden');
    });

    test('entries returns key-value pairs', () => {
        const entries = map.entries();
        expect(entries).toContainEqual(['apple', 'red']);
        expect(entries).toContainEqual(['lion', 'golden']);
    });

    test('clear empties the map', () => {
        map.clear();
        expect(map.get('apple')).toBe(null);
        expect(map.length()).toBe(0);
    });
});