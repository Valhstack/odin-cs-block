import { LinkedList } from "./linkedList.js";

describe('linked list', () => {

    test('appending to the list adds a new node at the end of the list', () => {
        const list = new LinkedList();
        list.append('dog');
        expect(list.toString()).toBe('( dog ) -> null');

        list.append('cat');
        expect(list.toString()).toBe('( dog ) -> ( cat ) -> null');
    });

    test('list.size() returns current size of the list', () => {
        const list = new LinkedList();
        expect(list.size()).toBe(0);

        list.append('dog');
        list.append('cat');

        expect(list.size()).toBe(2);

        list.prepend('mouse');

        expect(list.size()).toBe(3);
    });

    test('prepend(value) adds new node to the beginning of the list', () => {
        const list = new LinkedList();
        list.append('dog');
        list.append('cat');

        list.prepend('mouse');

        expect(list.toString()).toBe('( mouse ) -> ( dog ) -> ( cat ) -> null');
    });

    test('head() returns first node (element) of the list', () => {
        const list = new LinkedList();

        expect(list.head()).toBe(undefined);

        list.append('dog');
        expect(list.head()).toBe('dog');

        list.prepend('cat');
        expect(list.head()).toBe('cat');
    });

    test('tail() returns the last node (element) in the list', () => {
        const list = new LinkedList();
        expect(list.tail()).toBe(undefined);

        list.append('dog');
        expect(list.tail()).toBe('dog');

        list.append('cat');
        expect(list.tail()).toBe('cat');
    });

    test('at(index) returns a value of a node at a given index', () => {
        const list = new LinkedList();
        list.append('dog');
        list.append('cat');

        expect(list.at(0)).toBe('dog');

        list.prepend('mouse');
        expect(list.at(0)).toBe('mouse');
        expect(list.at(2)).toBe('cat');
    });

    test('pop() removes head node and returns its value', () => {
        const list = new LinkedList();
        list.append('dog');
        list.append('cat');

        const popResult = list.pop();
        const newHead = list.head();

        expect({ popResult, newHead }).toEqual({ popResult: 'dog', newHead: 'cat' });
    });

    test('contains(value) returns true if passed value is in the list and false if not', () => {
        const list = new LinkedList();
        list.append('dog');
        list.append('cat');

        expect(list.contains('dog')).toBe(true);
        expect(list.contains('mouse')).toBe(false);
        expect(list.contains('')).toBe(false);
    });

    test('findIndex(value) returns index of the element with given value; -1 if no node with such value exists; first met value if multiple nodes with value exist', () => {
        const list = new LinkedList();
        list.append('dog');
        list.append('cat');
        list.append('dog');

        expect(list.findIndex('cat')).toBe(1);
        expect(list.findIndex('dog')).toBe(0);
        expect(list.findIndex('mouse')).toBe(-1);
    });

    test('insertAt(index, ...values) insert nodes passed in values at the passed index; if index is below 0 or more than list size, RangeError is returned', () => {
        const list = new LinkedList();
        list.append(1);
        list.append(2);
        list.append(3);

        list.insertAt(1, 10, 11);

        expect(list.toString()).toBe('( 1 ) -> ( 10 ) -> ( 11 ) -> ( 2 ) -> ( 3 ) -> null');

        expect(() => list.insertAt(7, 12)).toThrow(RangeError);
    });

    test('removeAt(index) removes node at the passed index; if the given index is out of bounds (below 0 or greater than or equal to the list’s size), throw a RangeError', () => {
        const list = new LinkedList();
        list.append(1);
        list.append(2);
        list.append(3);

        list.removeAt(1);

        expect(list.toString()).toBe('( 1 ) -> ( 3 ) -> null');
    });
});