const sumatoria = (acc: number, val: number) => acc + val;

const dot = (vectorA: any[], vectorB: number[][]) => {
    if (typeof vectorA[0] == 'number' && typeof vectorB[0] && vectorA.length === vectorB.length)
        return [vectorA.map((v, i) => vectorB[i][0] * v).reduce(sumatoria)];

    else if (Array.isArray(vectorA[0]) && vectorA[0].length === vectorB.length)
        // Aplicar producto punto entre los vectores dentro del vector a y los elementos del vector b
        return vectorA.map(w => [vectorB.map((v, i) => w[i] * v[0]).reduce(sumatoria)]);

    else throw new Error('Los vectores deben ser de la misma forma');
};

export { dot };
