/**
 * 树的共有数据
 *
 * @class TreeModel
 */
class TreeModel {
    private _mesh; // 树干、树枝、树叶形状的多边形网格
    private _bark; // 树皮的纹理
    private _leaves; // 树叶的纹理
}

class Tree {
    private _model: TreeModel;
    private _position; // 树的位置
    private _height; // 树的高度
    private _thickness; // 树的厚度
    private _brakTint; // 树皮的色彩
    private _leafTint; // 树叶的色彩
}

enum TerrainType {
    Grass, // 草
    Hill, // 丘陵
    River // 河流
}

/**
 * 地形
 *
 * @class Terrain
 */
class Terrain {
    constructor(movementCost: number, isWater: boolean, type: TerrainType) {
        this._movementCost = movementCost;
        this._isWater = isWater;
        this._type = type;
    }
    getMovementCost(): number {
        return this._movementCost;
    }
    isWater(): boolean {
        return this._isWater;
    }
    getType(): TerrainType {
        return this._type;
    }
    private _movementCost: number; // 移动开销
    private _isWater: boolean; // 水域标识
    private _type: TerrainType; // 地形
}

/**
 * 世界网格
 *
 * @class World
 */
class World {
    constructor(width: number, height: number) {
        this._grassTerrain = new Terrain(1, false, TerrainType.Grass);
        this._hillTerrain = new Terrain(3, false, TerrainType.Hill);
        this._riverTerrain = new Terrain(2, true, TerrainType.River);
        this._generateTerrain(width, height);
    }
    private _generateTerrain(width: number, height: number): void {
        this._tileArr = [];
        // 将地面填满草和丘陵
        for (let i = 0; i < width; i++) {
            this._tileArr[i] = [];
            for (let j = 0; j < height; j++) {
                if (Math.random() > 0.5) {
                    this._tileArr[i][j] = this._grassTerrain;
                } else {
                    this._tileArr[i][j] = this._hillTerrain;
                }
            }
        }
        // 放置河流
        let x: number = Math.floor(width / 2);
        for (let i = 0; i < height; i++) {
            this._tileArr[x][i] = this._riverTerrain;
        }
    }
    getTile(x: number, y: number): Terrain {
        return this._tileArr[x][y];
    }
    private _tileArr: Terrain[][];
    private _grassTerrain: Terrain;
    private _hillTerrain: Terrain;
    private _riverTerrain: Terrain;
}

let world: World = new World(10, 10);
console.log(world.getTile(5, 5).isWater()); // true