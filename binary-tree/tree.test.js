import { Tree } from "./tree.js";

describe('balanced binary tree', () => {
    test("prettyPrint outputs tree structure", () => {
        const arr = [1, 2, 3];
        const tree = new Tree(arr);

        const logs = [];
        const originalLog = console.log;

        console.log = (msg) => logs.push(msg);

        tree.prettyPrint(tree.root);

        console.log = originalLog;

        expect(logs.length).toBeGreaterThan(0);
    });

    test('includes returns true if the value is present in the tree and false if it is not', () => {
        const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
        const tree = new Tree(arr);

        expect(tree.includes(1)).toBe(true);
        expect(tree.includes(2)).toBe(false);
    });

    test('insert adds a new node to the tree if it does not exist', () => {
        const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
        const tree = new Tree(arr);

        expect(tree.includes(55)).toBe(false);

        tree.insert(55);

        expect(tree.includes(55)).toBe(true);
    });

    describe("Tree delete", () => {
        let tree;

        beforeEach(() => {
            const arr = [1, 2, 3, 4, 5, 6, 7];
            tree = new Tree(arr);
        });

        test("deletes a leaf node", () => {
            tree.delete(1);
            expect(tree.includes(1)).toBe(false);
        });

        test("deletes node with one child", () => {
            tree.delete(6); // depending on structure, may have one child
            expect(tree.includes(6)).toBe(false);
        });

        test("deletes node with two children", () => {
            tree.delete(4); // root in balanced tree
            expect(tree.includes(4)).toBe(false);
        });

        test("tree still contains other values", () => {
            tree.delete(4);
            expect(tree.includes(3)).toBe(true);
            expect(tree.includes(5)).toBe(true);
        });

        test("deleting non-existent value does nothing", () => {
            tree.delete(999);
            expect(tree.includes(1)).toBe(true);
            expect(tree.includes(7)).toBe(true);
        });
    });

    test("traverses tree in level order", () => {
        const arr = [1, 2, 3, 4, 5, 6, 7];
        const tree = new Tree(arr);

        const result = [];

        tree.levelOrderForEach((value) => {
            result.push(value);
        });

        expect(result).toEqual([4, 2, 6, 1, 3, 5, 7]);
    });

    test("throws error if no callback provided", () => {
        const tree = new Tree([1, 2, 3]);

        expect(() => {
            tree.levelOrderForEach();
        }).toThrow("Callback is required");
    });

    test("does nothing for empty tree", () => {
        const tree = new Tree([]);

        const mock = jest.fn();

        tree.levelOrderForEach(mock);

        expect(mock).not.toHaveBeenCalled();
    });

    test("calls callback for each node", () => {
        const arr = [1, 2, 3, 4];
        const tree = new Tree(arr);

        const mock = jest.fn();

        tree.levelOrderForEach(mock);

        expect(mock).toHaveBeenCalledTimes(arr.length);
    });
});

const generateRandomArray = (size = 10, max = 100) => {
    return Array.from({ length: size }, () =>
        Math.floor(Math.random() * max)
    );
};

describe("BST driver test", () => {
    test("balance → unbalance → rebalance flow", () => {
        const arr = generateRandomArray();
        const tree = new Tree(arr);

        // initially balanced
        expect(tree.isBalanced()).toBe(true);

        // collect traversals
        const level = [];
        const pre = [];
        const post = [];
        const inorder = [];

        tree.levelOrderForEach(v => level.push(v));
        tree.preOrderForEach(v => pre.push(v));
        tree.postOrderForEach(v => post.push(v));
        tree.inOrderForEach(v => inorder.push(v));

        expect(level.length).toBeGreaterThan(0);
        expect(pre.length).toBe(level.length);
        expect(post.length).toBe(level.length);
        expect(inorder.length).toBe(level.length);

        // unbalance tree (large values)
        tree.insert(101);
        tree.insert(150);
        tree.insert(200);
        tree.insert(300);

        expect(tree.isBalanced()).toBe(false);

        // rebalance
        tree.rebalance();

        expect(tree.isBalanced()).toBe(true);

        // collect again after rebalance
        const level2 = [];
        tree.levelOrderForEach(v => level2.push(v));

        expect(level2.length).toBeGreaterThan(0);
    });
});