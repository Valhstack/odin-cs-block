export function knightShortestPath(start, target) {
    const moves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [1, -2], [-1, -2]];

    const queue = [];
    queue.push([start, [start]]);

    const visited = new Set();
    visited.add(start.toString());

    while (queue.length > 0) {
        const [currentPosition, path] = queue.shift();

        if (currentPosition[0] === target[0] && currentPosition[1] === target[1]) {
            return path;
        }

        for (let move of moves) {
            let newX = currentPosition[0] + move[0];
            let newY = currentPosition[1] + move[1];

            let newPosition = [newX, newY];

            if (isValid(newPosition) && !visited.has(newPosition.toString())) {
                visited.add(newPosition.toString());
                let newPath = [...path, newPosition];
                queue.push([newPosition, newPath]);
            }
        }
    }

    return null;
}

function isValid(position) {
    const [x, y] = position;

    return x >= 0 && x < 8 && y >= 0 && y < 8;
}