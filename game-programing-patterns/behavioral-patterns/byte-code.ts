class Expression {
    evaluate(): any { }
}

class NumberExpression extends Expression {
    private _value: number;
    constructor(value: number) {
        super();
        this._value = value;
    }
    evaluate(): number {
        return this._value;
    }
}

class AdditionExpression extends Expression {
    private _left: Expression;
    private _right: Expression;
    constructor(left: Expression, right: Expression) {
        super();
        this._left = left;
        this._right = right;
    }
    evaluate(): number {
        return this._left.evaluate() + this._right.evaluate();
    }
}