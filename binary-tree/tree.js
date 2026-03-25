import { mergeSort } from "../recursion/mergeSort.js";
import { Node } from "./node.js";

export class Tree {
    constructor(arr) {
        this.root = this.#buildTree(arr);
    }

    #buildTree(arr) {
        arr = [...new Set(arr)];
        arr = mergeSort(arr);
        return this.#buildBalancedTree(arr, 0, arr.length - 1);
    }

    #buildBalancedTree(arr, start, end) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);

        const leftTree = this.#buildBalancedTree(arr, start, mid - 1);
        const rightTree = this.#buildBalancedTree(arr, mid + 1, end);

        return new Node(arr[mid], leftTree, rightTree);
    }

    prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node === null || node === undefined) {
            return;
        }

        this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }

    includes(value) {
        return this.#includes(this.root, value);
    }

    #includes(node, value) {
        if (node == null) return false;

        if (node.data === value) return true;

        if (value < node.data) return this.#includes(node.left, value);
        else return this.#includes(node.right, value);
    }

    #insert(node, value) {
        if (node == null) return new Node(value);

        if (value < node.data) node.left = this.#insert(node.left, value);
        else if (value > node.data) node.right = this.#insert(node.right, value);

        return node;
    }

    insert(value) {
        this.root = this.#insert(this.root, value);
    }

    #delete(node, value) {
        if (node == null) return null;

        if (value < node.data) node.left = this.#delete(node.left, value);
        else if (value > node.data) node.right = this.#delete(node.right, value);
        else {
            if (node.left === null && node.right === null) return null;

            if (node.left === null) return node.right;
            if (node.right === null) return node.left;

            const successor = this.#findMin(node.right);
            node.data = successor.data;
            node.right = this.#delete(node.right, successor.data);
        }

        return node;
    }

    #findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }

        return node;
    }

    delete(value) {
        this.root = this.#delete(this.root, value);
    }

    levelOrderForEach(callback) {
        if (typeof callback !== 'function') throw new Error('Callback is required');

        if (this.root === null) return;

        const queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift();

            callback(node.data);

            if (node.left !== null) {
                queue.push(node.left);
            }

            if (node.right !== null) {
                queue.push(node.right);
            }
        }
    }

    inOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback is required');
        }

        const traverse = (node) => {
            if (node == null) return;

            traverse(node.left);
            callback(node.data);
            traverse(node.right);
        };

        traverse(this.root);
    }

    preOrderForEach(callback) {
        if (typeof callback !== 'function') throw new Error('Callback is required');

        const traverse = (node) => {
            if (node == null) return;

            callback(node.data);
            traverse(node.left);
            traverse(node.right);
        };

        traverse(this.root);
    }

    postOrderForEach(callback) {
        if (typeof callback !== 'function') throw new Error('Callback is required');

        const traverse = (node) => {
            if (node == null) return;

            traverse(node.left);
            traverse(node.right);
            callback(node.data);
        };

        traverse(this.root);
    }

    height(value) {
        const node = this.#findNode(this.root, value);
        if (node == null) return undefined;

        const getHeight = (node) => {
            if (node == null) return -1; // edges-based height

            const left = getHeight(node.left);
            const right = getHeight(node.right);

            return Math.max(left, right) + 1;
        };

        return getHeight(node);
    }

    #findNode(node, value) {
        if (node == null) return null;

        if (node.data === value) return node;

        if (value < node.data) return this.#findNode(node.left, value);
        else return this.#findNode(node.right, value);
    }

    depth(value) {
        let current = this.root;
        let depth = 0;

        while (current !== null) {
            if (current.data === value) return depth;

            if (value < current.data) current = current.left;
            else current = current.right;

            depth++;
        }

        return undefined;
    }

    #height(node) {
        if (node == null) return -1;

        return Math.max(
            this.#height(node.left),
            this.#height(node.right)
        ) + 1;
    }

    #isBalanced(node) {
        if (node == null) return true;

        let leftHeight = this.#height(node.left);
        let rightHeight = this.#height(node.right);

        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        }

        return this.#isBalanced(node.left) && this.#isBalanced(node.right);
    }

    isBalanced() {
        return this.#isBalanced(this.root);
    }

    rebalance() {
        const values = [];

        this.#inOrder(this.root, values);

        this.root = this.#buildTree(values);
    }

    #inOrder(node, values) {
        if (node == null) return;

        this.#inOrder(node.left, values);
        values.push(node.data);
        this.#inOrder(node.right, values);
    }
}