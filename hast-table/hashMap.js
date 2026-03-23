export class HashMap {
    constructor() {
        this._loadFactor = 0.75;
        this._capacity = 16;
        this._table = new Array(this._capacity);
        this._size = 0;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this._capacity;
        }

        return hashCode;
    }

    set(key, value) {
        const index = this.hash(key);

        if (!this._table[index]) {
            this._table[index] = [];
        }

        const bucket = this._table[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this._size++;

        if (this._size >= this._capacity * this._loadFactor) {
            const oldTable = this._table;

            this._capacity = this._capacity * 2;
            this._table = new Array(this._capacity);
            this._size = 0;

            for (let i = 0; i < oldTable.length; i++) {
                const bucket = oldTable[i];

                if (!bucket) continue;

                for (let j = 0; j < bucket.length; j++) {
                    this.set(bucket[j][0], bucket[j][1]);
                }
            }
        }
    }

    get(key) {
        const index = this.hash(key);
        const bucket = this._table[index];

        if (!bucket) return null;

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }

        return null;
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this._table[index];

        if (!bucket) return false;

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) return true;
        }

        return false;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this._table[index];

        if (!bucket) return false;

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this._size--;
                return true;
            }
        }

        return false;
    }

    length() {
        return this._size;
    }

    clear() {
        const newTable = new Array(this._capacity);
        this._table = newTable;
        this._size = 0;
    }

    keys() {
        const keys = [];

        for (let i = 0; i < this._table.length; i++) {
            const bucket = this._table[i];

            if (!bucket) continue;

            for (let j = 0; j < bucket.length; j++) {
                keys.push(bucket[j][0]);
            }
        }

        return keys;
    }

    values() {
        const values = [];

        for (let i = 0; i < this._table.length; i++) {
            const bucket = this._table[i];

            if (!bucket) continue;

            for (let j = 0; j < bucket.length; j++) {
                values.push(bucket[j][1]);
            }
        }

        return values;
    }

    entries() {
        const entries = [];

        for (let i = 0; i < this._table.length; i++) {
            const bucket = this._table[i];

            if (!bucket) continue;

            for (let j = 0; j < bucket.length; j++) {
                entries.push([bucket[j][0], bucket[j][1]]);
            }
        }

        return entries;
    }
}