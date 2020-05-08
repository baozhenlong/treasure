/**
 * 类型对象
 *
 * @class Breed
 */
class Breed {
    private _health: number; // 起始值
    private _attack: string;
    constructor(health: number, attack: string) {
        this._health = health;
        this._attack = attack;
    }
    getHealth(): number {
        return this._health;
    }
    getAttack(): string {
        return this._attack;
    }
    newMonster(): Monster {
        return new Monster(this);
    }
}

/**
 * 使用类型对象的类
 *
 * @class Monster
 */
class Monster {
    private _health: number;
    private _breed: Breed | BetterBreed; // 品种
    private _lowHealth: number = 10;
    constructor(breed: Breed | BetterBreed) {
        this._health = breed.getHealth();
        this._breed = breed;
    }
    getAttack(): string {
        let attack: string;
        if (this._health < this._lowHealth) {
            attack = 'The monster flails weakly';
        } else {
            attack = this._breed.getAttack();
        }
        return attack;
    }
    getHealth(): number {
        return this._breed.getHealth();
    }
}

// 创建怪物
let monster: Monster = new Breed(100, 'dragon').newMonster();
console.log(monster.getAttack());

class BetterBreed {
    private _health: number; // 起始值
    private _attack: string;
    constructor(parent: BetterBreed, health: number, attack: string) {
        if (parent !== undefined) {
            if (health === undefined) {
                health = parent.getHealth();
            }
            if (attack === undefined) {
                attack = parent.getAttack();
            }
        }
        this._health = health;
        this._attack = attack;
    }
    getHealth(): number {
        return this._health;
    }
    getAttack(): string {
        return this._attack;
    }
    newMonster(): Monster {
        return new Monster(this);
    }
}

let dragonConfig = {
    dragon: {
        health: 100,
        attack: 'dragon'
    },
    dragon1: {
        parent: 'dragon',
        health: 200,
        attack: undefined
    },
    dragon2: {
        parent: 'dragon',
        health: undefined,
        attack: 'dragon2'
    },
    dragon3: {
        health: 50,
        attack: 'dragon3'
    }
};
let dragonBreed: BetterBreed = new BetterBreed(null, dragonConfig.dragon.health, dragonConfig.dragon.attack);
let dragon: Monster = dragonBreed.newMonster();
let dragon1: Monster = new BetterBreed(dragonBreed, dragonConfig.dragon1.health, dragonConfig.dragon1.attack).newMonster();
let dragon2: Monster = new BetterBreed(dragonBreed, dragonConfig.dragon2.health, dragonConfig.dragon2.attack).newMonster();
let dragon3: Monster = new BetterBreed(dragonBreed, dragonConfig.dragon3.health, dragonConfig.dragon3.attack).newMonster();
console.log('dragon health', dragon.getHealth(), ', attack', dragon.getAttack()); // 100, dragon
console.log('dragon1 health', dragon1.getHealth(), ', attack', dragon1.getAttack()); // 200, dragon
console.log('dragon2 health', dragon2.getHealth(), ', attack', dragon2.getAttack()); // 100, dragon2
console.log('dragon3 health', dragon3.getHealth(), ', attack', dragon3.getAttack()); // 50, dragon3
