
/**
 * 单元
 *
 * @class Unit
 */
class Unit {
    x: number;
    y: number;
    private _grid: Grid;
    prev: Unit;
    next: Unit;
    constructor(grid: Grid, x: number, y: number) {
        this._grid = grid;
        this.x = x;
        this.y = y;
        this.prev = null;
        this.next = null;
        this._grid.add(this);
    }
    move(x: number, y: number): void {
        this._grid.move(this, x, y);
    }
}

/**
 * 网格
 *
 * @class Grid
 */
class Grid {
    private _size: number = 10;
    private _cellArr: Unit[][] = [];
    private _attackDistance: number = 2;
    constructor() {
        let length: number = this._size / 2;
        for (let x = 0; x < length; x++) {
            for (let y = 0; y < length; y++) {
                if (y === 0) {
                    this._cellArr[x] = [];
                }
                this._cellArr[x][y] = null;
            }
        }
    }
    add(unit: Unit): void {
        let cellX: number = Math.floor(unit.x / this._size);
        let cellY: number = Math.floor(unit.y / this._size);
        // 添加到所在单元格的列表前面
        unit.prev = null;
        unit.next = this._cellArr[cellX][cellY];
        this._cellArr[cellX][cellY] = unit;
        if (unit.next !== null) {
            unit.next.prev = unit;
        }
    }
    move(unit: Unit, x: number, y: number): void {
        let preCellX: number = Math.floor(unit.x / this._size);
        let preCellY: number = Math.floor(unit.y / this._size);
        let cellX: number = Math.floor(x / this._size);
        let cellY: number = Math.floor(y / this._size);
        unit.x = x;
        unit.y = y;
        if (preCellX === cellX && preCellY === cellY) {
            return;
        }
        // 取消链接
        if (unit.prev !== null) {
            unit.prev.next = unit.next;
        }
        if (unit.next !== null) {
            unit.next.prev = unit.prev;
        }
        // 如果是链表头
        if (this._cellArr[preCellX][preCellY] === unit) {
            this._cellArr[preCellX][preCellY] = unit.next;
        }
        // 添加到新的网格中
        this.add(unit);
    }
    // 混战
    handleMelee(): void {
        let length: number = this._size / 2;
        for (let x = 0; x < length; x++) {
            for (let y = 0; y < length; y++) {
                this.handleCell(x, y);
            }
        }
    }
    // 返回攻击距离
    distance(unit: Unit, other: Unit): number {
        return Math.sqrt(Math.pow((unit.x - other.x), 2) + Math.pow((unit.y - other.y), 2));
    }
    handleCell(x: number, y: number): void {
        let length: number = this._size / 2;
        let unit: Unit = this._cellArr[x][y];
        while (unit !== null) {
            let other: Unit = unit.next;
            // 处理此单元中的其他单元
            this.handleUnit(unit, other);
            // 处理相邻单元格
            // 为什么是 4 个，而不是 8 个
            if (x > 0 && y > 0) {
                this.handleUnit(unit, this._cellArr[x - 1][y - 1]);
            }
            if (x > 0) {
                this.handleUnit(unit, this._cellArr[x - 1][y]);
            }
            if (y > 0) {
                this.handleUnit(unit, this._cellArr[x][y - 1]);
            }
            if (x > 0 && y < length - 1) {
                this.handleUnit(unit, this._cellArr[x - 1][y + 1]);
            }
            unit = unit.next;
        }
    }
    handleUnit(unit: Unit, other: Unit): void {
        while (other !== null) {
            if (this.distance(unit, other) < this._attackDistance) {
                this.handleAttack(unit, other);
            }
            other = other.next;
        }
    }
    handleAttack(unit: Unit, other: Unit): void {

    }
}