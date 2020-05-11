class GameObject {
    private _input: InputComponent;
    private _physics: PhysicsComponent;
    private _graphics: GraphicsComponent;
    velocity: number;
    x: number;
    y: number;
    constructor(input: InputComponent, physics: PhysicsComponent, graphics: GraphicsComponent) {
        this._input = input;
        this._physics = physics;
        this._graphics = graphics;
    }
    update(): void {
        this._input.update(this);
        this._physics.update(this);
        this._graphics.update(this);
    }
    createGameObject(): GameObject {
        let input: InputComponent = new InputComponent();
        let physics: PhysicsComponent = new PhysicsComponent();
        let graphics: GraphicsComponent = new GraphicsComponent(physics);
        return new GameObject(input, physics, graphics);
    }
}

enum Direction {
    Left,
    Right
}

/**
 * 输入
 *
 * @class InputComponent
 */
class InputComponent {
    static wlakAcceleration: number = 1;
    private _direction: Direction;
    update(gameObject: GameObject): void {
        switch (this._direction) {
            case Direction.Left:
                gameObject.velocity -= InputComponent.wlakAcceleration;
                break;
            case Direction.Right:
                gameObject.velocity += InputComponent.wlakAcceleration;
                break;
        }
    }
}

/**
 * 物理
 *
 * @class PhysicsComponent
 */
class PhysicsComponent {
    update(gameObject: GameObject): void {
        gameObject.x += gameObject.velocity;
    }
}

/**
 * 渲染
 *
 * @class GraphicsComponent
 */
class GraphicsComponent {
    private _physics: PhysicsComponent;
    constructor(physics: PhysicsComponent) {
        this._physics = physics;
    }
    update(gameObject: GameObject): void { }
}

/**
 * 消息接口
 *
 * @class Component
 */
class Component {
    receive(messange: string): void {

    }
}

/**
 * 容器对象
 *
 * @class ContainerObject
 */
class ContainerObject {
    private _componentArr: Component[];
    send(messange: string): void {
        for (let i = 0; i < this._componentArr.length; i++) {
            if (this._componentArr[i] !== null) {
                this._componentArr[i].receive(messange);
            }
        }
    }
}