export const mergeSort = (arr) => {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);

    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
};

const merge = (arrLeft, arrRight) => {
    const sorted = [];

    let i = 0, j = 0;

    while (i < arrLeft.length && j < arrRight.length) {
        if (arrLeft[i] < arrRight[j]) {
            sorted.push(arrLeft[i]);
            i++;
        }
        else {
            sorted.push(arrRight[j]);
            j++;
        }
    }

    while (i < arrLeft.length) {
        sorted.push(arrLeft[i]);
        i++;
    }

    while (j < arrRight.length) {
        sorted.push(arrRight[j]);
        j++;
    }

    return sorted;
};