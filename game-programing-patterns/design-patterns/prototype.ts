class Monster {
    clone(): Monster {
        return new Monster();
    }
    log(): void { }
}

class Ghost extends Monster {
    private _health: number;
    private _speed: number;
    constructor(health: number, speed: number) {
        super();
        this._health = health;
        this._speed = speed;
    }
    /**
     * 返回与自己完全一样的新对象
     *
     * @returns {Ghost}
     * @memberof Ghost
     */
    clone(): Ghost {
        return new Ghost(this._health, this._speed);
    }
    log(): void {
        console.log('Ghost health =', this._health, ', speed =', this._speed);
    }
}

class Spawner {
    private _prototype: Monster;
    constructor(prototype: Monster) {
        this._prototype = prototype;
    }
    spwanMonster(): Monster {
        return this._prototype.clone();
    }
}

let ghostPrototype: Ghost = new Ghost(15, 3);
(new Spawner(ghostPrototype)).spwanMonster().log(); // Ghost health = 15 , speed = 3

function spawnGhost(health: number, speed: number): Ghost {
    return new Ghost(health, speed);
}

class BetterSpawner {
    private _spawner: Function;
    constructor(spawner: Function) {
        this._spawner = spawner;
    }
    spwanMonster(...params: any[]): Monster {
        return this._spawner(...params);
    }
}

(new BetterSpawner(spawnGhost).spwanMonster(20, 5)).log(); // Ghost health = 20 , speed = 5
