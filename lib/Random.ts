export class Random {
    private static _seed = 0x2F6E2B1;
  
    private static _rand(): number {
        this._seed = ((this._seed + 0x7ED55D16) + (this._seed << 12)) & 0xFFFFFFFF;
        this._seed = ((this._seed ^ 0xC761C23C) ^ (this._seed >>> 19)) & 0xFFFFFFFF;
        this._seed = ((this._seed + 0x165667B1) + (this._seed << 5)) & 0xFFFFFFFF;
        this._seed = ((this._seed + 0xD3A2646C) ^ (this._seed << 9)) & 0xFFFFFFFF;
        this._seed = ((this._seed + 0xFD7046C5) + (this._seed << 3)) & 0xFFFFFFFF;
        this._seed = ((this._seed ^ 0xB55A4F09) ^ (this._seed >>> 16)) & 0xFFFFFFFF;
        return (this._seed & 0xFFFFFFF) / 0x10000000;
    }
  
    private static getCoordinates(index: number, dimensions: number[]): number[] {
        return dimensions.map((dim, i) => {
          const size = dimensions.slice(i + 1).reduce((acc, cur) => acc * cur, 1);
          return Math.floor(index / size) % dim;
        });
      }
      
  
    private static setValue(arr: any[], coords: number[], value: number) {
        const lastIndex = coords.length - 1;
        const lastCoord = coords[lastIndex];
        
        arr = coords.slice(0, lastIndex).reduce((acc, cur) => {
            return acc[cur] = acc[cur] || [];
        }, arr);
        
        arr[lastCoord] = value;
    }
      
  
    static seed(x: number): void {
        this._seed = x;
    }
  
    static generate(dimensions: number[]): number[][] {
        const total = dimensions.reduce((acc, cur) => acc * cur, 1);

        const result: number[][] = [];

        for (let i = 0; i < total; i++) {
            const coords = this.getCoordinates(i, dimensions);
            this.setValue(result, coords, this._rand());
        }

        return result;
    }
}
