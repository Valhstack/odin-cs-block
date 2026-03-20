import { Node } from './node.js';

export class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this._size = 0;
    }

    append(value) {
        const newNode = new Node(value);

        if (this._head === null) {
            this._head = newNode;
            this._tail = newNode;
            this._size++;
            return;
        }

        this._tail.next = newNode;
        this._tail = newNode;
        this._size++;
    }

    prepend(value) {
        const newNode = new Node(value);

        if (this._size === 0) {
            this._head = newNode;
            this._tail = newNode;
            this._size++;
            return;
        }

        newNode.next = this._head;
        this._head = newNode;

        this._size++;
    }

    size() {
        return this._size;
    }

    head() {
        return this._head === null ? undefined : this._head.value;
    }

    tail() {
        return this._tail === null ? undefined : this._tail.value;
    }

    at(index) {
        if (index === 0) return this.head();
        else if (index === this._size - 1) return this.tail();
        else if (index >= this._size || index < 0) return undefined;

        let current = this._head, i = 0;
        while (current !== null) {
            if (i === index) {
                return current.value;
            }

            current = current.next;
            i++;
        }
    }

    pop() {
        if (this._head === null) return undefined;

        let nextNode = this._head.next;
        const value = this._head.value;

        if (nextNode === null) {
            this._tail = null;
        }

        this._head = nextNode;

        this._size--;

        return value;
    }

    contains(value) {
        let current = this._head;

        while (current !== null) {
            if (current.value === value)
                return true;

            current = current.next;
        }

        return false;
    }

    findIndex(value) {
        let current = this._head, i = 0;

        while (current !== null) {
            if (current.value === value)
                return i;

            current = current.next;
            i++;
        }

        return -1;
    }

    toString() {
        if (!this._head) return 'null';
        let str = '';

        let current = this._head;

        while (current !== null) {
            str += `( ${current.value} ) -> `;
            current = current.next;
        }

        str += 'null';

        return str;
    }

    insertAt(index, ...values) {
        if (index < 0 || index > this._size) throw new RangeError(`The index should be >= 0 or <= ${this._size}`);
        if (values.length === 0) return;

        if (index === 0) {
            for (let i = values.length - 1; i >= 0; i--) {
                const newNode = new Node(values[i]);
                newNode.next = this._head;
                this._head = newNode;
                this._size++;
            }

            if (this._tail === null) {
                this._tail = this._head;
            }

            return;
        }

        let prev = this._head;

        for (let i = 0; i < index - 1; i++) {
            prev = prev.next;
        }

        let nextNode = prev.next;
        let firstNew = null, lastNew = null;

        for (let value of values) {
            let newNode = new Node(value);

            if (firstNew === null) {
                firstNew = newNode;
                lastNew = newNode;
            }
            else {
                lastNew.next = newNode;
                lastNew = newNode;
            }

            this._size++;
        }

        prev.next = firstNew;
        lastNew.next = nextNode;

        if (nextNode === null) {
            this._tail = lastNew;
        }
    }

    removeAt(index) {
        if (index < 0 || index >= this._size) throw new RangeError(`The index should be >= 0 or < ${this._size}`);

        let prev = this._head, current = prev.next, i = 1;

        if (index === 0) {
            this.pop();
            return;
        }

        while (current !== null) {
            if (i === index) {
                prev.next = current.next;

                if (current.next === null) {
                    this._tail = prev;
                }

                this._size--;
                return;
            }

            prev = current;
            current = current.next;
        }
    }
}