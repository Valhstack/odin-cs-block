export const fibonacci = (n) => {
    if (n <= 0) return [];
    if (n === 1) return [0];
    if (n === 2) return [0, 1];

    const prev = fibonacci(n - 1);
    const next = prev[prev.length - 1] + prev[prev.length - 2];

    return [...prev, next];
};