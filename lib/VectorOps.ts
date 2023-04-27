export class VectorOps
{
    static ScalarOpScalar(scalarA: number, op: string, scalarB: number) : number {
        switch (op) {
            case '+': return scalarA + scalarB;
            case '-': return scalarA - scalarB;
            case '*': return scalarA * scalarB;
            case '/': return scalarA / scalarB;
            case '^': return Math.pow(scalarA, scalarB);
            default: throw new Error('Operador no soportado');
        }
    }

    static ScalarOpVector(scalar: number, op: string, vector: any[]): any[] {
        return vector.map((v: any[]) => {
            if (typeof v == 'number') return this.ScalarOpScalar(scalar, op, v);
            else if (Array.isArray(v)) return this.ScalarOpVector(scalar, op, v);
            else throw new TypeError(`Tipo de dato del elemento '${v}' no esta admitido`);
        });
    }

    static VectorOpScalar(vector: any[], op: string, scalar: number): any[] {
        return vector.map((v: any[]) => {
            if (typeof v == 'number') return this.ScalarOpScalar(v, op, scalar);
            else if (Array.isArray(v)) return this.VectorOpScalar(v, op, scalar);
            else throw new TypeError(`Tipo de dato del elemento '${v}' no esta admitido`);
        });
    }

    static VectorOpVectorDeVectores(vector: any[], op: string, vectorDeVectores: any[]): any[] {
        if (vector.length !== vectorDeVectores[0].length) {
            throw new Error('Los vectores dentro del vector B deben ser de la misma forma que el vector A');
        }

        return vectorDeVectores.map((vdv) => {
            return vdv.map((v: number, i: number) => {
                return this.ScalarOpScalar(vector[i], op, v);
            });
        });
    }

    static VectorDeVectoresOpVector(vectorDeVectores: any[], op: string, vector: any[]): any[] {
        if (vector.length !== vectorDeVectores[0].length) {
            throw new Error('Los vectores dentro del vector A deben ser de la misma forma que el vector B');
        }

        return vectorDeVectores.map((vdv) => {
            return vdv.map((v: number, i: number) => {
                return this.ScalarOpScalar(v, op, vector[i]);
            });
        });
    }

    private static operateVectors(scalarA: number[], scalarB: number[], op: string): number[] {
        if (scalarA.length !== scalarB.length) {
            throw new Error('Los vectores deben ser de la misma forma');
        }

        return scalarA.map((v, i) => this.ScalarOpScalar(v, op, scalarB[i]));
    }

    static VectorOpVector(vectorA: any[], op: string, vectorB: any[]): any[] {
        if (!Array.isArray(vectorA) || !Array.isArray(vectorB)) {
            throw new TypeError('Los operandos deben ser vectores');
        }

        if (typeof vectorA[0] === 'number') {
            if (typeof vectorB[0] === 'number') {
                if (vectorA.length !== vectorB.length) {
                    throw new Error('Los vectores deben ser de la misma forma');
                }
                return this.operateVectors(vectorA, vectorB, op);
            } else if (Array.isArray(vectorB[0])) {
                throw new TypeError('Tipo de dato para el vector B invalido');
            }
        } else if (Array.isArray(vectorA[0])) {
            if (typeof vectorB[0] === 'number') {
                throw new TypeError('Tipo de dato para el vector B invalido');
            } else if (Array.isArray(vectorB[0])) {
                if (vectorA.length !== vectorB.length) {
                    if (vectorA.length === 1) {
                        return vectorB.map((v) => this.operateVectors(vectorA[0], v, op));
                    } else if (vectorB.length === 1) {
                        return vectorA.map((v) => this.operateVectors(v, vectorB[0], op));
                    } else {
                        throw new Error('Los vectores deben ser de la misma forma');
                    }
                } else {
                    return vectorA.map((v, i) => this.operateVectors(v, vectorB[i], op));
                }
            }
        }

        throw new TypeError('Tipo de dato para los vectores invalido');
    }

    static Operate(operandoIzquierdo: any, operador: string, operandoDerecho: any) : any | any[] {
        if (typeof operandoIzquierdo === 'number')
        {
            if (typeof operandoDerecho === 'number') return this.ScalarOpScalar(operandoIzquierdo, operador, operandoDerecho);
            else if (Array.isArray(operandoDerecho)) return this.ScalarOpVector(operandoIzquierdo, operador, operandoDerecho);
            else throw new TypeError('Tipo de dato del operando derecho no admitido');
        }
        else if (Array.isArray(operandoIzquierdo))
        {
            if (typeof operandoDerecho === 'number') return this.VectorOpScalar(operandoIzquierdo, operador, operandoDerecho);
            else if (Array.isArray(operandoDerecho)) return this.VectorOpVector(operandoIzquierdo, operador, operandoDerecho);
            else throw new TypeError('Tipo de dato del operando derecho no admitido');
        }
        else throw new TypeError('Tipo de dato del operando izquierdo no admitido');
    }
}
