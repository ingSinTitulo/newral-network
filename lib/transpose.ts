interface Array<T> {
    transpose(): Array<T>;
}

Array.prototype.transpose = function () {
    const transposedArray = new Array(this[0].length);

    for (let i = 0; i < this.length; i++)
        for (let j = 0; j < this[i].length; j++) {
            const value = this[i][j];
            const columnIndex = j;

            if (transposedArray[columnIndex] === undefined)
                transposedArray[columnIndex] = [];

            transposedArray[columnIndex].push(value);
        }

    return transposedArray;
};
  