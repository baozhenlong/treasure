class SuperPower {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._z = 0;
    }
    protected activate(): void { }
    protected move(x: number, y: number, z: number): void {
        this._x = x;
        this._y = y;
        this._z = z;
    }
    protected playSound(volume: number): void { }
    protected spawnParticles(count: number): void { }
    protected getHeroX(): number {
        return this._x;
    }
    protected getHeroY(): number {
        return this._y;
    }
    protected getHeroZ(): number {
        return this._z;
    }
    private _x: number;
    private _y: number;
    private _z: number;
}

class SkyLaunch extends SuperPower {
    protected activate(): void {
        if (this.getHeroZ() === 0) {
            // 在地面上
            this.playSound(1);
            this.spawnParticles(10);
            this.move(0, 0, 20);
        } else if (this.getHeroZ() < 10) {

        } else {

        }
    }
}

class DirectPower {
    protected playSound(id: number): void { }
    protected stopSound(id: number): void { }
    protected setVolume(id: number): void { }
}

class SoundPlayer {
    playSound(id: number): void { }
    stopSound(id: number): void { }
    setVolume(id: number): void { }
}

class IndirectPower {
    private _soundPlayer: SoundPlayer;
    getSoundPlayer(): SoundPlayer {
        return this._soundPlayer;
    }
}

class State {

}

class StatePower {

}

class PassStatePower extends StatePower {
    private _state: State;
    constructor(state: State) {
        super();
        this._state = state;
    }
}

class SubPassStatePower extends PassStatePower {
    constructor(state: State) {
        super(state);
    }
}

class InitStatePower {
    private _state: State;
    init(state: State): void {
        this._state = state;
    }
}

class SubInitStatePower extends StatePower {
    createState(state: State): State {
        let initStatePower: InitStatePower = new InitStatePower();
        initStatePower.init(state)
        return initStatePower;
    }
}

class StaticStatePower extends StatePower {
    private static _state: State;
    static init(state: State): void {
        this._state = state;
    }
}

class Locator {
    private static _state: State = new State();
    static getState(): State {
        return Locator._state;
    }
}

class LocatorStatePower extends StatePower {
    private _state: State;
    initSate(): void {
        this._state = Locator.getState();
    }
}