class Entity {
    private _x: number;
    private _y: number;
    constructor() {
        this._x = 0;
        this._y = 0;
    }
    setX(x: number): void {
        this._x = x;
    }
    setY(y: number): void {
        this._y = y;
    }
    x(): number {
        return this._x;
    }
    y(): number {
        return this._y;
    }
    update(): void { }
}

class World {
    private _entityNum: number;
    private _entityArr: Entity[];
    constructor() {
        this._entityNum = 0;
    }
    gameLoop(): void {
        while (true) {
            // 处理用户输入
            // 更新实体
            for (let i = 0; i < this._entityNum; i++) {
                this._entityArr[i].update();
            }
            // 物理和渲染
        }
    }
}

class Skeleton extends Entity {
    private _patrollingLeft: boolean;
    constructor() {
        super();
        this._patrollingLeft = false;
    }
    update() {
        if (this._patrollingLeft) {
            this.setX(this.x() - 1);
            if (this.x() === 0) {
                this._patrollingLeft = false;
            }
        } else {
            this.setX(this.x() + 1);
            if (this.x() === 100) {
                this._patrollingLeft = true;
            }
        }
    }
}

class Statue extends Entity {
    private _frames: number;
    private _delay: number;
    constructor(delay: number) {
        super();
        this._frames = 0;
        this._delay = delay;
    }
    private _shootLightning(): void { }
    update(): void {
        if (++this._frames === this._delay) {
            this._shootLightning();
            this._frames = 0;
        }
    }
}