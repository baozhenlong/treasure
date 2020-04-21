class Command {
    execute(): void { }
    undo(): void { } // 回滚 execute() 方法造成的游戏状态的改变
}

class JumpCommand extends Command {
    jump(): void {
        console.log('jump');
    }
    execute(): void {
        this.jump();
    }
}

class FireGunCommand extends Command {
    fireGun(): void {
        console.log('fireGun');
    }
    execute(): void {
        this.fireGun();
    }
}

class LurchCommand extends Command {
    lurch(): void {
        console.log('lurch');
    }
    execute(): void {
        this.lurch();
    }
}

class SwapWeaponCommand extends Command {
    swapWeapon(): void {
        console.log('swapWeapon');
    }
    execute(): void {
        this.swapWeapon();
    }
}

class InputHandler {
    x: JumpCommand = new JumpCommand();
    y: FireGunCommand = new FireGunCommand();
    b: LurchCommand = new LurchCommand();
    a: SwapWeaponCommand = new SwapWeaponCommand();
}

let input: InputHandler = new InputHandler();
input.x.execute();

interface GameActor {
    jump: Function;
    fireGun: Function;
    lurch: Function;
    swapWeapon: Function;
}

class BetterCommand {
    execute(actor: GameActor): void { }
}

class BetterJumpCommand extends BetterCommand {
    execute(actor: GameActor): void {
        actor.jump();
    }
}

class BetterFireGunCommand extends BetterCommand {
    execute(actor: GameActor): void {
        actor.fireGun();
    }
}

class BetterLurchCommand extends BetterCommand {
    execute(actor: GameActor): void {
        actor.lurch();
    }
}

class BetterSwapWeaponCommand extends BetterCommand {
    execute(actor: GameActor): void {
        actor.swapWeapon();
    }
}

class BetterInputHandler {
    x: BetterJumpCommand = new BetterJumpCommand();
    y: BetterFireGunCommand = new BetterFireGunCommand();
    b: BetterLurchCommand = new BetterLurchCommand();
    a: BetterSwapWeaponCommand = new BetterSwapWeaponCommand();
}

let betterInput: BetterInputHandler = new BetterInputHandler();
let actor: GameActor = {
    jump(): void {
        console.log('actor jump');
    },
    fireGun(): void {
        console.log('actor fireGun');
    },
    lurch(): void {
        console.log('actor lurch');
    },
    swapWeapon(): void {
        console.log('actor swapWeapon');
    }
};
betterInput.x.execute(actor);

class MoveUnitCommand extends Command {
    constructor(x: number, y: number) {
        super();
        this._x = x;
        this._y = y;
        this._xBefore = 0;
        this._yBefore = 0;
    }
    private _xBefore: number;
    private _yBefore: number;
    private _x: number;
    private _y: number;
    private _actor: {
        moveTo(x: number, y: number): void
    };

    execute(): void {
        // 保存移动之前的位置
        this._xBefore = this._x;
        this._yBefore = this._y;
        this._x++;
        this._y++;
        this._actor.moveTo(this._x, this._y);
    }

    /**
     * 撤销
     *
     * @memberof MoveUnitCommand
     */
    undo(): void {
        this._x = this._xBefore;
        this._y = this._yBefore;
        this._actor.moveTo(this._x, this._y);
    }
}