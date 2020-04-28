enum State {
    Standing, // 站立
    Jumping, // 跳跃
    Squating, // 蹲下
    JumpCutting // 跳斩
}

enum Input {
    PressB, // 按下 B
    PressDown, // 按下 ↓
    RleaseDown // 松开 ↓
}

class HeroState {
    enter(hero: Hero | ConcurrentHero): void { }
    handleInput(hero: Hero | ConcurrentHero, input: Input): HeroState {
        return null;
    }
    /**
     * 每帧调用
     *
     * @param {(Hero | ConcurrentHero)} hero
     * @memberof HeroState
     */
    update(hero: Hero | ConcurrentHero): void { }
    static standing: StandingState;
    static jumping: JumpingState;
    static squating: SquatingState;
    static jumpCutting: JumpCuttingState;
}

class JumpCuttingState extends HeroState {
    enter(hero: Hero): void {
        hero.setGraphics(State.JumpCutting);
    }
    handleInput(hero: Hero, input: Input): HeroState {
        return null;
    }
}

class SquatingState extends HeroState {
    /**
     * 当前充能时间
     *
     * @private
     * @type {number}
     * @memberof SquatingState
     */
    private _chargeTime: number = 0;
    /**
     * 最大充能时间，达到后可以释放一次特殊攻击
     *
     * @private
     * @type {number}
     * @memberof SquatingState
     */
    private _maximalChargeTime: number = 10;
    constructor() {
        super();
        this._chargeTime = 0;
    }
    enter(hero: Hero): void {
        hero.setGraphics(State.Squating);
    }
    handleInput(hero: Hero, input: Input): HeroState {
        if (input === Input.RleaseDown) {
            return new StandingState();
        }
        return null;
    }
    update(hero: Hero) {
        this._chargeTime++;
        if (this._chargeTime > this._maximalChargeTime) {
            hero.superBomb();
        }
    }
}

class JumpingState extends HeroState {
    enter(hero: Hero): void {
        hero.setGraphics(State.Jumping);
    }
    handleInput(hero: Hero, input: Input): HeroState {
        if (input === Input.PressDown) {
            return new JumpCuttingState();
        }
        return null;
    }
}

class StandingState extends HeroState {
    enter(hero: Hero): void {
        hero.setGraphics(State.Standing);
    }
    handleInput(hero: Hero, input: Input): HeroState {
        if (input === Input.PressB) {
            return new JumpingState();
        } else if (input === Input.PressDown) {
            // 蹲下状态有新字段 _chargeTime 和 _maximalChargeTime
            // 需要创建新的状态对象
            return new SquatingState();
        }
        return null;
    }
}

class Hero {
    handleInput(input: Input): void {
        let state: HeroState = this._state.handleInput(this, input);
        // 分配新状态
        if (state !== null) {
            delete this._state;
            this._state = state;
            // 调用新状态的入口行为
            this._state.enter(this);
        }
    }
    update(): void {
        this._state.update(this);
    }
    setGraphics(state: State): void { }
    superBomb(): void { }
    private _state: HeroState;
}

class ConcurrentHero {
    private _state: HeroState;
    /**
     * 装备
     *
     * @private
     * @type {HeroState}
     * @memberof ConcurrentHero
     */
    private _equipment: HeroState;
    update(): void { }
    superBomb(): void { }
    setGraphics(state: State): void { }
    handleInput(input: Input): void {
        let state: HeroState = this._state.handleInput(this, input);
        // 分配新状态
        if (state !== null) {
            delete this._state;
            this._state = state;
            // 调用新状态的入口行为
            this._state.enter(this);
        }
        let equipment: HeroState = this._equipment.handleInput(this, input);
        // 分配新状态
        if (equipment !== null) {
            delete this._equipment;
            this._equipment = equipment;
            // 调用新状态的入口行为
            this._equipment.enter(this);
        }
    }
}

class OnGroundState extends HeroState {
    handleInput(hero: Hero | ConcurrentHero, input: Input): HeroState {
        if (input === Input.PressB) {
            // 跳跃
        } else if (input === Input.PressDown) {
            // 蹲下
        }
        return null;
    }
}

class HierarchicalSquatingState extends OnGroundState {
    handleInput(hero: Hero | ConcurrentHero, input: Input): HeroState {
        if (input === Input.RleaseDown) {
            // 站起
        } else {
            // 没有处理返回上一层
            super.handleInput(hero, input);
        }
        return null;
    }
}